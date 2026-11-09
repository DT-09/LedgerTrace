(function(root){
  'use strict';
  const FORMAT='ledgertrace-cycle-archive';
  const VERSION=1;
  const ITERATIONS=310000;
  const MAX_BYTES=10*1024*1024;
  const encoder=new TextEncoder();
  const decoder=new TextDecoder();

  function cryptoApi(api){
    const c=api||root.crypto||globalThis.crypto;
    if(!c||!c.subtle||!c.getRandomValues)throw new Error('Web Crypto is unavailable in this browser.');
    return c;
  }
  function toBase64(bytes){
    let binary='';
    for(let i=0;i<bytes.length;i+=0x8000)binary+=String.fromCharCode(...bytes.subarray(i,i+0x8000));
    return btoa(binary);
  }
  function fromBase64(value){
    if(typeof value!=='string'||!value)throw new Error('Archive encoding is invalid.');
    const binary=atob(value);
    const out=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)out[i]=binary.charCodeAt(i);
    return out;
  }
  function validateArchive(value){
    if(!value||typeof value!=='object'||value.schemaVersion!==1||value.product!=='LedgerTrace')throw new Error('This is not a supported LedgerTrace cycle archive.');
    if(typeof value.period!=='string'||!/^\d{4}-(0[1-9]|1[0-2])$/.test(value.period))throw new Error('Archive accounting period is invalid.');
    if(!Array.isArray(value.results)||!Array.isArray(value.review))throw new Error('Archive is missing its review records.');
    return value;
  }
  async function deriveKey(passphrase,salt,api){
    const c=cryptoApi(api);
    const material=await c.subtle.importKey('raw',encoder.encode(passphrase),'PBKDF2',false,['deriveKey']);
    return c.subtle.deriveKey({name:'PBKDF2',salt,iterations:ITERATIONS,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
  }
  async function encrypt(archive,passphrase,api){
    validateArchive(archive);
    if(typeof passphrase!=='string'||passphrase.length<12)throw new Error('Use an archive passphrase of at least 12 characters.');
    const c=cryptoApi(api);
    const plain=encoder.encode(JSON.stringify(archive));
    if(plain.length>MAX_BYTES)throw new Error('Archive exceeds the 10 MB limit.');
    const salt=c.getRandomValues(new Uint8Array(16));
    const iv=c.getRandomValues(new Uint8Array(12));
    const key=await deriveKey(passphrase,salt,c);
    const encrypted=await c.subtle.encrypt({name:'AES-GCM',iv},key,plain);
    return {format:FORMAT,version:VERSION,kdf:'PBKDF2-SHA-256',iterations:ITERATIONS,cipher:'AES-256-GCM',salt:toBase64(salt),iv:toBase64(iv),ciphertext:toBase64(new Uint8Array(encrypted))};
  }
  async function decrypt(envelope,passphrase,api){
    if(!envelope||envelope.format!==FORMAT||envelope.version!==VERSION||envelope.kdf!=='PBKDF2-SHA-256'||envelope.cipher!=='AES-256-GCM'||envelope.iterations!==ITERATIONS)throw new Error('Archive format or encryption parameters are unsupported.');
    if(typeof passphrase!=='string'||passphrase.length<1)throw new Error('Enter the archive passphrase.');
    const salt=fromBase64(envelope.salt),iv=fromBase64(envelope.iv),ciphertext=fromBase64(envelope.ciphertext);
    if(salt.length!==16||iv.length!==12||ciphertext.length>MAX_BYTES+32)throw new Error('Archive is malformed or exceeds the size limit.');
    const c=cryptoApi(api);
    const key=await deriveKey(passphrase,salt,c);
    const plain=await c.subtle.decrypt({name:'AES-GCM',iv},key,ciphertext);
    if(plain.byteLength>MAX_BYTES)throw new Error('Decrypted archive exceeds the 10 MB limit.');
    return validateArchive(JSON.parse(decoder.decode(plain)));
  }
  function normalize(value){
    return String(value==null?'':value).trim().toUpperCase().replace(/[^A-Z0-9]+/g,'');
  }
  function collect(cycle){
    const map=new Map();
    let uncomparable=0;
    for(const row of cycle.results){
      if(!row||row.status==='matched'||!Array.isArray(row.findings)||!row.findings.length)continue;
      const supplier=normalize(row.supplier),po=normalize(row.po),item=normalize(row.item);
      if(!supplier||!po||!item){uncomparable++;continue;}
      for(const finding of row.findings){
        const code=normalize(finding&&finding.code);
        if(!code)continue;
        const key=[supplier,po,item,code].join('|');
        if(!map.has(key))map.set(key,{supplier:row.supplier,po:row.po,item:row.item,code:finding.code,label:finding.label||finding.code,invoice:row.invoice||''});
      }
    }
    return {map,uncomparable};
  }
  function compare(previous,current){
    validateArchive(previous);validateArchive(current);
    const before=collect(previous),after=collect(current);
    const recurring=[],newCases=[],cleared=[];
    for(const [key,value] of after.map){
      if(before.map.has(key))recurring.push({...value,previousInvoice:before.map.get(key).invoice});
      else newCases.push(value);
    }
    for(const [key,value] of before.map)if(!after.map.has(key))cleared.push(value);
    const sort=(a,b)=>String(a.supplier).localeCompare(String(b.supplier))||String(a.po).localeCompare(String(b.po))||String(a.item).localeCompare(String(b.item))||String(a.code).localeCompare(String(b.code));
    recurring.sort(sort);newCases.sort(sort);cleared.sort(sort);
    return {previousPeriod:previous.period,currentPeriod:current.period,recurring,newCases,cleared,uncomparable:before.uncomparable+after.uncomparable};
  }
  root.LedgerTraceArchive=Object.freeze({encrypt,decrypt,compare,validateArchive});
})(typeof window!=='undefined'?window:globalThis);
