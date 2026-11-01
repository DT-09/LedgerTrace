/* LedgerTrace Recovery core. Pure browser-side CSV analysis; never treats a mismatch as confirmed recovery. */
(function (root) {
  'use strict';
  const norm = v => String(v ?? '').trim().toLowerCase().replace(/[\s\-]+/g, '_');
  const aliases = {
    invoice: { invoice:['invoice_number','invoice_no','invoice_id','bill_number'], supplier:['supplier','vendor','vendor_name'], po:['po_number','purchase_order_number','po','purchase_order'], item:['item_code','sku','item','product_code'], qty:['quantity','qty','invoiced_quantity'], price:['unit_price','price','rate'], amount:['line_amount','amount','net_amount','line_total'], date:['invoice_date','date'], currency:['currency'], row:['__row'] },
    po: { po:['po_number','purchase_order_number','po','purchase_order'], supplier:['supplier','vendor','vendor_name'], item:['item_code','sku','item','product_code'], qty:['quantity','qty','ordered_quantity'], price:['unit_price','price','rate'], amount:['line_amount','amount'], date:['po_date','order_date'], currency:['currency'], row:['__row'] },
    receipt: { receipt:['receipt_number','grn','goods_receipt','receipt_id'], po:['po_number','purchase_order_number','po','purchase_order'], supplier:['supplier','vendor','vendor_name'], item:['item_code','sku','item','product_code'], qty:['quantity','qty','received_quantity'], date:['receipt_date','date'], row:['__row'] },
    payment: { payment:['payment_id','payment_reference','transaction_id'], invoice:['invoice_number','invoice_no','invoice_id','bill_number'], supplier:['supplier','vendor','vendor_name'], amount:['paid_amount','payment_amount','amount','amount_paid'], date:['payment_date','date'], currency:['currency'], row:['__row'] },
    credit: { credit:['credit_note','credit_note_number','credit_number','credit_id'], invoice:['invoice_number','invoice_no','invoice_id','bill_number'], supplier:['supplier','vendor','vendor_name'], amount:['credit_amount','amount','credited_amount'], date:['credit_date','date'], currency:['currency'], row:['__row'] },
    amendment: { po:['po_number','purchase_order_number','po','purchase_order'], supplier:['supplier','vendor','vendor_name'], item:['item_code','sku','item','product_code'], qty:['quantity','qty','amended_quantity'], price:['unit_price','price','amended_unit_price'], effective:['effective_date','amendment_date','date'], amendment:['amendment_id','change_order','reference'], row:['__row'] }
  };
  function parseCSV(text) {
    const source=String(text??'').replace(/^\uFEFF/,'');
    if(source.length>10*1024*1024)throw new Error('CSV exceeds the 10 MB file limit.');
    const rows=[]; let row=[],cell='',quoted=false,quoteClosed=false,line=1,rowStartLine=1;
    for(let i=0;i<source.length;i++){
      const c=source[i],next=source[i+1];
      if(quoted){
        if(c==='"'&&next==='"'){cell+='"';i++;}
        else if(c==='"'){quoted=false;quoteClosed=true;}
        else {cell+=c;if(c==='\n')line++;}
      }else if(c==='"'){
        if(cell!=='')throw new Error('CSV contains a quote inside an unquoted field near line '+line+'.');
        quoted=true;quoteClosed=false;
      }else if(c===','){
        row.push(cell);cell='';quoteClosed=false;
      }else if(c==='\r'||c==='\n'){
        if(c==='\r'&&next==='\n')i++;
        row.push(cell);
        if(row.some(x=>x.trim()!==''))rows.push({cells:row,line:rowStartLine});
        row=[];cell='';quoteClosed=false;line++;rowStartLine=line;
      }else if(quoteClosed){
        if(!/\s/.test(c))throw new Error('CSV contains unexpected text after a closing quote near line '+line+'.');
      }else cell+=c;
    }
    if(quoted)throw new Error('CSV contains an unclosed quoted field near line '+rowStartLine+'.');
    row.push(cell);
    if(row.some(x=>x.trim()!==''))rows.push({cells:row,line:rowStartLine});
    if(!rows.length)return [];
    if(rows.length>50001)throw new Error('CSV exceeds the 50,000 data-row limit.');
    const headers=rows.shift().cells.map(h=>norm(h));
    if(!headers.length||headers.some(h=>!h))throw new Error('CSV contains an empty column name.');
    if(new Set(headers).size!==headers.length)throw new Error('CSV contains duplicate column names after normalization.');
    return rows.map(record=>{
      if(record.cells.length>headers.length)throw new Error('CSV row '+record.line+' contains more values than the header row.');
      const out={__row:record.line};
      headers.forEach((h,j)=>out[h]=record.cells[j]??'');
      return out;
    });
  }
  function field(row, names) { for(const n of names){ if(row[n]!==undefined && String(row[n]).trim()!=='') return row[n]; } return ''; }
  function number(v){ if(v===null||v===undefined||String(v).trim()==='') return NaN; const raw=String(v).trim().replace(/[$£€₹\s]/g,''); if(!/^[+-]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(raw)) return NaN; const n=Number(raw.replace(/,/g,'')); return Number.isFinite(n)?n:NaN; }
  function normalize(rows,type){ return rows.map(raw=>{const out={sourceRow:raw.__row}; for(const [k,names] of Object.entries(aliases[type])){if(k==='row')continue;out[k]=String(field(raw,names)).trim();} for(const k of ['qty','price','amount']) if(k in out) out[k]=number(out[k]); for(const k of ['invoice','supplier','po','item','receipt','payment','credit','currency','effective','date','amendment']) if(k in out) out[k]=String(out[k]??'').trim(); return out;});}
  const key = (...parts) => parts.map(v=>norm(v)).join('|');
  const isoDate = value => { const v=String(value||''); if(!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false; const d=new Date(v+'T00:00:00Z'); return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===v; };
  const money = (n,currency='') => Number.isFinite(n) ? (currency ? currency+' ' : '')+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}) : 'Not available';
  function analyze(input){
    const invoices=normalize(input.invoices||[],'invoice'), pos=normalize(input.pos||[],'po'), receipts=normalize(input.receipts||[],'receipt'), payments=normalize(input.payments||[],'payment'), credits=normalize(input.credits||[],'credit'), amendments=normalize(input.amendments||[],'amendment');
    if(!invoices.length) throw new Error('Load an invoice CSV before running an investigation.');
    const group=(rows,fn)=>{const m=new Map();for(const r of rows){const k=fn(r);if(!m.has(k))m.set(k,[]);m.get(k).push(r);}return m;};
    const poMap=group(pos,r=>key(r.po,r.item)), recMap=group(receipts,r=>key(r.po,r.item));
    const invoiceMap=group(invoices,r=>key(r.supplier,r.invoice));
    const amendMap=group(amendments,r=>key(r.po,r.item));
    const results=invoices.map(inv=>{
      const findings=[], k=key(inv.po,inv.item), hasMatchKey=Boolean(inv.po&&inv.item), pRows=hasMatchKey?(poMap.get(k)||[]):[], rawReceiptRows=hasMatchKey?(recMap.get(k)||[]):[], rRows=rawReceiptRows.filter(r=>Boolean(inv.supplier)&&Boolean(r.supplier)&&key(r.supplier)===key(inv.supplier));
      const receiptSupplierConflict=rawReceiptRows.length>0&&rRows.length===0&&Boolean(inv.supplier)&&rawReceiptRows.some(r=>Boolean(r.supplier));
      const receiptSupplierMissing=rawReceiptRows.some(r=>!r.supplier);
      const matchingPO=pRows.filter(p=>Boolean(inv.supplier)&&Boolean(p.supplier)&&key(p.supplier)===key(inv.supplier));
      const supplierConflict=pRows.length>0&&matchingPO.length===0&&Boolean(inv.supplier)&&pRows.some(p=>Boolean(p.supplier));
      const supplierEvidenceMissing=!inv.supplier||pRows.some(p=>!p.supplier);
      const poRows=matchingPO;
      let qtyOrdered=poRows.length&&poRows.every(p=>Number.isFinite(p.qty)&&p.qty>=0)?poRows.reduce((s,p)=>s+p.qty,0):NaN;
      let poPrices=[...new Set(poRows.filter(p=>Number.isFinite(p.price)).map(p=>p.price))];
      let poPrice=poRows.length&&poRows.every(p=>Number.isFinite(p.price)&&p.price>=0)&&poPrices.length===1?poPrices[0]:NaN;
      const rawAmendments=amendMap.get(k)||[];
      const amendmentSupplierMissing=rawAmendments.some(a=>!a.supplier)||(rawAmendments.length>0&&!inv.supplier);
      const amendmentSupplierConflict=rawAmendments.some(a=>Boolean(a.supplier)&&Boolean(inv.supplier)&&key(a.supplier)!==key(inv.supplier));
      const applicableAmendments=rawAmendments.filter(a=>Boolean(inv.supplier)&&Boolean(a.supplier)&&key(a.supplier)===key(inv.supplier));
      const amendmentDateInvalid=applicableAmendments.length>0&&(!isoDate(inv.date)||applicableAmendments.some(a=>!isoDate(a.effective)));
      const amendmentValuesInvalid=applicableAmendments.some(a=>(!Number.isFinite(a.price)&&!Number.isFinite(a.qty))||(Number.isFinite(a.price)&&a.price<0)||(Number.isFinite(a.qty)&&a.qty<0));
      const amendmentEffectivityUnverified=amendmentSupplierMissing||amendmentDateInvalid||amendmentValuesInvalid;
      let amendmentConflict=false;
      if(applicableAmendments.length&&!amendmentEffectivityUnverified){
        const dated=applicableAmendments.filter(a=>a.effective<=inv.date).sort((a,b)=>String(a.effective).localeCompare(String(b.effective)));
        if(dated.length){
          const latestDate=dated[dated.length-1].effective;
          const latestSet=dated.filter(a=>a.effective===latestDate);
          const signatures=new Set(latestSet.map(a=>(Number.isFinite(a.qty)?a.qty:'')+'|'+(Number.isFinite(a.price)?a.price:'')));
          if(signatures.size>1)amendmentConflict=true;
          else{const latest=latestSet[latestSet.length-1];if(Number.isFinite(latest.price))poPrice=latest.price;if(Number.isFinite(latest.qty))qtyOrdered=latest.qty;findings.push({code:'amendment_applied',label:'PO amendment considered',detail:'Amendment '+(latest.amendment||'at source row '+latest.sourceRow)+' applied using ISO effective dates; verify the change order is approved.'});}
        }
      }
      const received=rRows.length&&rRows.every(r=>Number.isFinite(r.qty)&&r.qty>=0)?rRows.reduce((s,r)=>s+r.qty,0):NaN;
      if(!inv.invoice)findings.push({code:'invoice_id_missing',label:'Invoice reference missing',detail:'Cannot reliably link payment and credit records without an invoice reference.'});
      if(!hasMatchKey)findings.push({code:'match_key_missing',label:'PO or item reference missing',detail:'A complete PO number and item code are required before source rows can be linked.'});
      if(supplierEvidenceMissing)findings.push({code:'supplier_identity_incomplete',label:'Supplier identity incomplete',detail:'The invoice and matched PO records must both identify the supplier before amounts are quantified.'});
      if(!Number.isFinite(inv.qty)||inv.qty<0)findings.push({code:'invoice_quantity_invalid',label:'Invoice quantity unavailable or invalid',detail:'A non-negative numeric invoice quantity is required for quantity-based calculations.'});
      if(poRows.some(p=>!Number.isFinite(p.qty)||p.qty<0))findings.push({code:'po_quantity_invalid',label:'PO quantity unavailable or invalid',detail:'At least one matched PO line has a missing, nonnumeric or negative quantity.'});
      if(poRows.some(p=>!Number.isFinite(p.price)||p.price<0))findings.push({code:'po_price_invalid',label:'PO unit price unavailable or invalid',detail:'At least one matched PO line has a missing, nonnumeric or negative unit price.'});
      if(rRows.some(r=>!Number.isFinite(r.qty)||r.qty<0))findings.push({code:'receipt_quantity_invalid',label:'Receipt quantity unavailable or invalid',detail:'At least one matched receipt has a missing, nonnumeric or negative quantity.'});
      if(receiptSupplierMissing)findings.push({code:'receipt_supplier_incomplete',label:'Receipt supplier identity missing',detail:'Receipt rows without supplier identity were excluded from quantity support.'});
      if(supplierConflict)findings.push({code:'supplier_mismatch',label:'Supplier does not match PO',detail:'PO/item records exist, but none match the invoice supplier. Do not quantify until resolved.'});
      if(amendmentSupplierMissing)findings.push({code:'amendment_supplier_missing',label:'Amendment supplier identity missing',detail:'A PO amendment lacks supplier identity or the invoice supplier is missing. The amendment was not applied.'});
      if(amendmentSupplierConflict)findings.push({code:'amendment_supplier_conflict',label:'Amendment supplier conflicts with invoice',detail:'A PO amendment for this PO/item names a different supplier and was excluded.'});
      if(amendmentEffectivityUnverified)findings.push({code:'amendment_effectivity_unverified',label:'PO amendment effectivity cannot be verified',detail:'An applicable amendment has a missing or non-ISO date, missing values, or no valid invoice date. Amount-based calculations are withheld.'});
      if(amendmentConflict)findings.push({code:'amendment_conflict',label:'Conflicting PO amendments share an effective date',detail:'Multiple applicable amendments have the same latest effective date but different values. Resolve the approved amendment before quantifying.'});
      if(receiptSupplierConflict)findings.push({code:'receipt_supplier_mismatch',label:'Receipt supplier does not match invoice',detail:'PO/item receipt rows exist, but none match the invoice supplier. These receipts were excluded from quantity support.'});
      if(!poRows.length&&!supplierConflict)findings.push({code:'po_missing',label:'No matching purchase-order line',detail:'No PO/item line with a compatible supplier was found.'});
      if(poRows.length>1&&poPrices.length>1)findings.push({code:'ambiguous_po_price',label:'Conflicting PO unit prices',detail:'Multiple matching PO lines have different unit prices; exact line allocation is unresolved.'});
      if(!rRows.length)findings.push({code:'receipt_missing',label:'No goods receipt found',detail:'No receipt supports the invoiced goods for this PO/item.'});
      if(Number.isFinite(inv.qty)&&Number.isFinite(qtyOrdered)&&inv.qty>qtyOrdered)findings.push({code:'qty_over_ordered',label:'Invoiced quantity exceeds ordered quantity',detail:'Invoice quantity '+inv.qty+' exceeds the matched ordered quantity '+qtyOrdered+'.'});
      if(Number.isFinite(inv.qty)&&rRows.length&&inv.qty>received)findings.push({code:'qty_over_received',label:'Invoiced quantity exceeds received quantity',detail:'Invoice quantity '+inv.qty+' exceeds total matched receipt quantity '+received+'.'});
      if(Number.isFinite(inv.amount)&&Number.isFinite(inv.qty)&&Number.isFinite(inv.price)&&Math.abs(inv.amount-inv.qty*inv.price)>0.02)findings.push({code:'line_math',label:'Invoice line arithmetic differs',detail:'Line amount differs from quantity × unit price by more than 0.02 currency units.'});
      if(Number.isFinite(inv.price)&&Number.isFinite(poPrice)&&Math.abs(inv.price-poPrice)>0.0101)findings.push({code:'price_over_po',label:inv.price>poPrice?'Invoice unit price above PO':'Invoice unit price below PO',detail:'Invoice unit price '+inv.price+'; reference PO price '+poPrice+'.'});
      const invoiceLines=invoiceMap.get(key(inv.supplier,inv.invoice))||[];
      if(invoiceLines.length>1)findings.push({code:'invoice_multi_line',label:'Invoice has multiple lines',detail:'This invoice reference appears on '+invoiceLines.length+' lines. This is not, by itself, a duplicate.'});
      const rawPaymentRows=payments.filter(p=>Boolean(p.invoice)&&key(p.invoice)===key(inv.invoice));
      const rawCreditRows=credits.filter(c=>Boolean(c.invoice)&&key(c.invoice)===key(inv.invoice));
      const paymentSupplierConflict=rawPaymentRows.some(p=>Boolean(p.supplier)&&Boolean(inv.supplier)&&key(p.supplier)!==key(inv.supplier));
      const creditSupplierConflict=rawCreditRows.some(c=>Boolean(c.supplier)&&Boolean(inv.supplier)&&key(c.supplier)!==key(inv.supplier));
      const paymentRows=rawPaymentRows.filter(p=>!p.supplier||!inv.supplier||key(p.supplier)===key(inv.supplier));
      const creditRows=rawCreditRows.filter(c=>!c.supplier||!inv.supplier||key(c.supplier)===key(inv.supplier));
      const monetaryRows=[inv,...poRows,...paymentRows,...creditRows];
      const knownCurrencies=monetaryRows.map(r=>String(r.currency||'').trim()).filter(Boolean);
      const currencyConflict=new Set(knownCurrencies.map(v=>key(v))).size>1||monetaryRows.some(r=>!String(r.currency||'').trim());
      if(currencyConflict)findings.push({code:'currency_mismatch',label:'Currency evidence missing or inconsistent',detail:'Invoice, matched PO, payment and credit records must supply one consistent currency. Amount-based findings are withheld when currency is missing or inconsistent.'});
      const paymentAmountsComplete=paymentRows.every(p=>Number.isFinite(p.amount));
      const creditAmountsComplete=creditRows.every(c=>Number.isFinite(c.amount));
      const paymentSupplierMissing=paymentRows.some(p=>!p.supplier);
      const creditSupplierMissing=creditRows.some(c=>!c.supplier);
      if(paymentRows.length&&!paymentAmountsComplete)findings.push({code:'payment_amount_invalid',label:'Payment amount unavailable or invalid',detail:'At least one linked payment row has no valid numeric amount; payment excess is withheld.'});
      if(creditRows.length&&!creditAmountsComplete)findings.push({code:'credit_amount_invalid',label:'Credit amount unavailable or invalid',detail:'At least one linked credit row has no valid numeric amount; net expected amount is withheld.'});
      if(paymentSupplierMissing)findings.push({code:'payment_supplier_missing',label:'Payment supplier identity missing',detail:'Linked payment rows without supplier identity cannot support a payment-excess candidate.'});
      if(creditSupplierMissing)findings.push({code:'credit_supplier_missing',label:'Credit supplier identity missing',detail:'Linked credit rows without supplier identity cannot support a net expected amount.'});
      if(paymentSupplierConflict)findings.push({code:'payment_supplier_conflict',label:'Payment supplier conflicts with invoice',detail:'A payment row shares this invoice reference but names a different supplier (source row(s): '+rawPaymentRows.filter(p=>p.supplier&&inv.supplier&&key(p.supplier)!==key(inv.supplier)).map(p=>p.sourceRow).join(', ')+'). Payment excess is withheld until the reference is resolved.'});
      if(creditSupplierConflict)findings.push({code:'credit_supplier_conflict',label:'Credit supplier conflicts with invoice',detail:'A credit row shares this invoice reference but names a different supplier (source row(s): '+rawCreditRows.filter(c=>c.supplier&&inv.supplier&&key(c.supplier)!==key(inv.supplier)).map(c=>c.sourceRow).join(', ')+'). Net expected amount is withheld until the credit is resolved.'});
      const billedForShare=r=>Number.isFinite(r.amount)?r.amount:(Number.isFinite(r.qty)&&Number.isFinite(r.price)?r.qty*r.price:0);
      const invoiceTotal=(invoiceMap.get(key(inv.supplier,inv.invoice))||[]).reduce((s,r)=>s+billedForShare(r),0);
      const share=invoiceTotal>0?billedForShare(inv)/invoiceTotal:0;
      const paid=currencyConflict||!paymentAmountsComplete||paymentSupplierMissing||paymentSupplierConflict?NaN:paymentRows.reduce((s,p)=>s+p.amount,0)*share;
      const credited=currencyConflict||!creditAmountsComplete||creditSupplierMissing||creditSupplierConflict?NaN:creditRows.reduce((s,c)=>s+c.amount,0)*share;
      const currency=inv.currency||paymentRows.find(p=>p.currency)?.currency||'';
      let supportedQty=NaN, expectedBeforeCredits=NaN, expectedNet=NaN, candidate=NaN, paymentExcessCandidate=NaN, status='needs_review';
      const canPrice=poRows.length>0&&!supplierConflict&&!supplierEvidenceMissing&&!currencyConflict&&!amendmentEffectivityUnverified&&!amendmentConflict&&Number.isFinite(credited)&&!(poRows.length>1&&poPrices.length>1)&&Number.isFinite(poPrice);
      const canQty=Number.isFinite(inv.qty)&&inv.qty>=0&&Number.isFinite(qtyOrdered)&&Number.isFinite(received)&&rRows.length>0&&!supplierEvidenceMissing&&!receiptSupplierConflict;
      if(canQty) supportedQty=Math.max(0,Math.min(inv.qty,qtyOrdered,received));
      if(canPrice&&canQty){
        expectedBeforeCredits=supportedQty*poPrice;
        expectedNet=Math.max(0,expectedBeforeCredits-credited);
        const invoiceBilled=Number.isFinite(inv.amount)?inv.amount:(Number.isFinite(inv.qty)&&Number.isFinite(inv.price)?inv.qty*inv.price:NaN);
        const overcharge=Number.isFinite(invoiceBilled)?Math.max(0,invoiceBilled-expectedNet):NaN;
        candidate=overcharge;
        if(paymentRows.length>0&&Number.isFinite(inv.amount)&&Number.isFinite(paid)&&!paymentSupplierMissing&&!paymentSupplierConflict){
          paymentExcessCandidate=Math.max(0,paid-expectedNet);
          status=paymentExcessCandidate>0?'payment_excess_candidate':(candidate>0?'invoice_excess_unverified':'reviewed_no_excess');
        }else status=candidate>0?'invoice_excess_unpaid_or_unverified':'review';
      }
      if(credited>0)findings.push({code:'credit_present',label:'Supplier credit included',detail:'Matched credit records total '+money(credited,currency)+' and are netted from the expected amount. Confirm the credit belongs to this invoice and is not already reflected in the PO/invoice.'});
      if(paymentRows.length===0)findings.push({code:'payment_unverified',label:'Payment status not supplied',detail:'No matching payment row was supplied. The product cannot claim a paid overpayment.'});
      if(canPrice&&canQty&&candidate>0)findings.push({code:'excess_candidate',label:'Potential invoice excess',detail:'Calculated invoice excess is '+money(candidate,currency)+' before confirming taxes, freight, tolerances, amendments and payment allocation.'});
      if(Number.isFinite(paymentExcessCandidate)&&paymentExcessCandidate>0)findings.push({code:'payment_excess',label:'Payment exceeds reconstructed net expected amount',detail:'Matched payments exceed the reconstructed net amount by '+money(paymentExcessCandidate,currency)+'. Human review is still required before a recovery claim.'});
      const sourceRows={invoice:inv.sourceRow,po:poRows.map(p=>p.sourceRow),receipts:rRows.map(r=>r.sourceRow),payments:paymentRows.map(p=>p.sourceRow),credits:creditRows.map(c=>c.sourceRow),amendments:rawAmendments.map(a=>a.sourceRow)};
      return {id:'LT-'+String(inv.sourceRow).padStart(4,'0'),invoice:inv.invoice||'(missing)',supplier:inv.supplier||'(missing)',po:inv.po||'(missing)',item:inv.item||'(missing)',currency,qty:inv.qty,invoicePrice:inv.price,invoiceAmount:Number.isFinite(inv.amount)?inv.amount:(Number.isFinite(inv.qty)&&Number.isFinite(inv.price)?inv.qty*inv.price:NaN),qtyOrdered,qtyReceived:received,poPrice,paid:paymentRows.length?paid:NaN,credits:credited,expectedNet,candidate,paymentExcessCandidate,status,findings,sourceRows,invoiceDate:inv.date||'',paymentCount:paymentRows.length,creditCount:creditRows.length};
    });
    const knownCurrencies=[...new Map(results.filter(r=>r.currency).map(r=>[key(r.currency),r.currency])).values()],currencyUnresolved=knownCurrencies.length>1||results.some(r=>r.findings.some(f=>f.code==='currency_mismatch'));return {results,summary:{invoiceLines:results.length,flagged:results.filter(r=>r.findings.some(f=>['excess_candidate','payment_excess','price_over_po','qty_over_ordered','qty_over_received'].includes(f.code))).length,paymentExcessCandidates:results.filter(r=>Number.isFinite(r.paymentExcessCandidate)&&r.paymentExcessCandidate>0).length,unverifiedPayments:results.filter(r=>!Number.isFinite(r.paid)).length,currencyUnresolved,currency:!currencyUnresolved?knownCurrencies[0]||'':'',invoiceExcess:currencyUnresolved?NaN:results.reduce((s,r)=>s+(Number.isFinite(r.candidate)?r.candidate:0),0),paymentExcess:currencyUnresolved?NaN:results.reduce((s,r)=>s+(Number.isFinite(r.paymentExcessCandidate)?r.paymentExcessCandidate:0),0),interpretation:'Invoice excess and payment excess are separate, potentially overlapping measures. Do not add them together; validate each candidate against source documents.'}};
  }
  root.LedgerTraceCore={parseCSV,normalize,analyze,money};
})(typeof window!=='undefined'?window:globalThis);
