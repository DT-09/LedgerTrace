'use strict';
const assert=require('node:assert/strict');
require('../assets/ledgertrace-cycle-archive.js');
const api=globalThis.LedgerTraceArchive;
const prior={schemaVersion:1,product:'LedgerTrace',period:'2026-10',createdAt:'2026-11-01T00:00:00.000Z',runAt:'2026-11-01T00:00:00.000Z',sourceCounts:{invoices:2,pos:2,receipts:2},results:[
 {status:'exception',supplier:'Northstar Components',po:'PO-100',item:'PART-A',invoice:'INV-10',findings:[{code:'price_mismatch',label:'Unit price differs'}]},
 {status:'exception',supplier:'Unknown supplier',po:'',item:'PART-X',invoice:'INV-11',findings:[{code:'missing_po_reference',label:'Missing PO'}]}
],review:[]};
const current={schemaVersion:1,product:'LedgerTrace',period:'2026-11',createdAt:'2026-12-01T00:00:00.000Z',runAt:'2026-12-01T00:00:00.000Z',sourceCounts:{invoices:2,pos:2,receipts:2},results:[
 {status:'exception',supplier:'Northstar Components',po:'PO 100',item:'PART-A',invoice:'INV-20',findings:[{code:'price_mismatch',label:'Unit price differs'}]},
 {status:'exception',supplier:'Harbor Supply',po:'PO-200',item:'PART-B',invoice:'INV-21',findings:[{code:'receipt_missing',label:'No receipt'}]}
],review:[]};
(async()=>{
 assert.ok(api,'archive API is exposed');
 const diff=api.compare(prior,current);
 assert.equal(diff.recurring.length,1);
 assert.equal(diff.newCases.length,1);
 assert.equal(diff.cleared.length,0);
 assert.equal(diff.uncomparable,1);
 const password='ledgertrace-test-passphrase';
 const envelope=await api.encrypt(prior,password);
 assert.equal(envelope.format,'ledgertrace-cycle-archive');
 const restored=await api.decrypt(envelope,password);
 assert.deepEqual(restored,prior);
 await assert.rejects(()=>api.decrypt(envelope,'incorrect-passphrase'));
 assert.throws(()=>api.validateArchive({schemaVersion:1,product:'Other',period:'2026-10',results:[],review:[]}),/supported LedgerTrace/);
 console.log('LedgerTrace encrypted cycle archive tests passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
