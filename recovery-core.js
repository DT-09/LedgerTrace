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
    const rows=[]; let row=[], cell='', quoted=false;
    text=String(text??'').replace(/^\uFEFF/,'');
    for(let i=0;i<text.length;i++){ const c=text[i], n=text[i+1];
      if(quoted){ if(c==='"'&&n==='"'){cell+='"';i++;} else if(c==='"') quoted=false; else cell+=c; }
      else if(c==='"') quoted=true;
      else if(c===','){row.push(cell);cell='';}
      else if(c==='\n'){row.push(cell);if(row.some(x=>x.trim()!==''))rows.push(row);row=[];cell='';}
      else if(c!=='\r')cell+=c;
    }
    row.push(cell); if(row.some(x=>x.trim()!==''))rows.push(row);
    if(!rows.length) return [];
    const headers=rows.shift().map(h=>norm(h));
    return rows.map((cells,i)=>{const out={__row:i+2};headers.forEach((h,j)=>out[h]=cells[j]??'');return out;});
  }
  function field(row, names) { for(const n of names){ if(row[n]!==undefined && String(row[n]).trim()!=='') return row[n]; } return ''; }
  function number(v){ if(v===null||v===undefined||String(v).trim()==='') return NaN; const n=Number(String(v).replace(/[$,£€₹\s]/g,'')); return Number.isFinite(n)?n:NaN; }
  function normalize(rows,type){ return rows.map(raw=>{const out={sourceRow:raw.__row}; for(const [k,names] of Object.entries(aliases[type])){if(k==='row')continue;out[k]=String(field(raw,names)).trim();} for(const k of ['qty','price','amount']) if(k in out) out[k]=number(out[k]); for(const k of ['invoice','supplier','po','item','receipt','payment','credit','currency','effective','date','amendment']) if(k in out) out[k]=String(out[k]??'').trim(); return out;});}
  const key = (...parts) => parts.map(v=>norm(v)).join('|');
  const money = (n,currency='') => Number.isFinite(n) ? (currency ? currency+' ' : '')+n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}) : 'Not available';
  function analyze(input){
    const invoices=normalize(input.invoices||[],'invoice'), pos=normalize(input.pos||[],'po'), receipts=normalize(input.receipts||[],'receipt'), payments=normalize(input.payments||[],'payment'), credits=normalize(input.credits||[],'credit'), amendments=normalize(input.amendments||[],'amendment');
    if(!invoices.length) throw new Error('Load an invoice CSV before running an investigation.');
    const group=(rows,fn)=>{const m=new Map();for(const r of rows){const k=fn(r);if(!m.has(k))m.set(k,[]);m.get(k).push(r);}return m;};
    const poMap=group(pos,r=>key(r.po,r.item)), recMap=group(receipts,r=>key(r.po,r.item));
    const invoiceMap=group(invoices,r=>key(r.supplier,r.invoice));
    const amendMap=group(amendments,r=>key(r.po,r.item));
    const results=invoices.map(inv=>{
      const findings=[], k=key(inv.po,inv.item), pRows=poMap.get(k)||[], rawReceiptRows=recMap.get(k)||[], rRows=rawReceiptRows.filter(r=>!inv.supplier||!r.supplier||key(r.supplier)===key(inv.supplier));
      const receiptSupplierConflict=rawReceiptRows.length>0&&rRows.length===0&&Boolean(inv.supplier)&&rawReceiptRows.some(r=>Boolean(r.supplier));
      const matchingPO=pRows.filter(p=>!inv.supplier||!p.supplier||key(p.supplier)===key(inv.supplier));
      const supplierConflict=pRows.length>0&&matchingPO.length===0;
      const poRows=matchingPO;
      let qtyOrdered=poRows.reduce((s,p)=>s+(Number.isFinite(p.qty)?p.qty:0),0);
      let poPrices=[...new Set(poRows.filter(p=>Number.isFinite(p.price)).map(p=>p.price))];
      let poPrice=poPrices.length===1?poPrices[0]:NaN;
      const applicableAmendments=(amendMap.get(k)||[]).filter(a=>!a.supplier||!inv.supplier||key(a.supplier)===key(inv.supplier));
      if(applicableAmendments.length){
        const dated=applicableAmendments.filter(a=>!a.effective||!inv.date||a.effective<=inv.date).sort((a,b)=>String(a.effective).localeCompare(String(b.effective)));
        if(dated.length){const latest=dated[dated.length-1];if(Number.isFinite(latest.price))poPrice=latest.price;if(Number.isFinite(latest.qty))qtyOrdered=latest.qty;findings.push({code:'amendment_applied',label:'PO amendment considered',detail:'Amendment '+(latest.amendment||'at source row '+latest.sourceRow)+' applied by effective date; verify the change order is approved.'});}
      }
      const received=rRows.reduce((s,r)=>s+(Number.isFinite(r.qty)?r.qty:0),0);
      if(!inv.invoice)findings.push({code:'invoice_id_missing',label:'Invoice reference missing',detail:'Cannot reliably link payment and credit records without an invoice reference.'});
      if(supplierConflict)findings.push({code:'supplier_mismatch',label:'Supplier does not match PO',detail:'PO/item records exist, but none match the invoice supplier. Do not quantify until resolved.'});
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
      const paymentRows=payments.filter(p=>Boolean(p.invoice)&&key(p.invoice)===key(inv.invoice)&&(!p.supplier||!inv.supplier||key(p.supplier)===key(inv.supplier)));
      const creditRows=credits.filter(c=>Boolean(c.invoice)&&key(c.invoice)===key(inv.invoice)&&(!c.supplier||!inv.supplier||key(c.supplier)===key(inv.supplier)));
      const monetaryRows=[inv,...poRows,...paymentRows,...creditRows];
      const knownCurrencies=monetaryRows.map(r=>String(r.currency||'').trim()).filter(Boolean);
      const currencyConflict=new Set(knownCurrencies.map(v=>key(v))).size>1||monetaryRows.some(r=>!String(r.currency||'').trim());
      if(currencyConflict)findings.push({code:'currency_mismatch',label:'Currency evidence missing or inconsistent',detail:'Invoice, matched PO, payment and credit records must supply one consistent currency. Amount-based findings are withheld when currency is missing or inconsistent.'});
      const billedForShare=r=>Number.isFinite(r.amount)?r.amount:(Number.isFinite(r.qty)&&Number.isFinite(r.price)?r.qty*r.price:0);
      const invoiceTotal=(invoiceMap.get(key(inv.supplier,inv.invoice))||[]).reduce((s,r)=>s+billedForShare(r),0);
      const share=invoiceTotal>0?billedForShare(inv)/invoiceTotal:0;
      const paid=currencyConflict?NaN:paymentRows.reduce((s,p)=>s+(Number.isFinite(p.amount)?p.amount:0),0)*share;
      const credited=currencyConflict?NaN:creditRows.reduce((s,c)=>s+(Number.isFinite(c.amount)?c.amount:0),0)*share;
      const currency=inv.currency||paymentRows.find(p=>p.currency)?.currency||'';
      let supportedQty=NaN, expectedBeforeCredits=NaN, expectedNet=NaN, candidate=NaN, paymentExcessCandidate=NaN, status='needs_review';
      const canPrice=poRows.length>0&&!supplierConflict&&!currencyConflict&&!(poRows.length>1&&poPrices.length>1)&&Number.isFinite(poPrice);
      const canQty=Number.isFinite(inv.qty)&&Number.isFinite(qtyOrdered)&&rRows.length>0;
      if(canQty) supportedQty=Math.max(0,Math.min(inv.qty,qtyOrdered,received));
      if(canPrice&&canQty){
        expectedBeforeCredits=supportedQty*poPrice;
        expectedNet=Math.max(0,expectedBeforeCredits-credited);
        const invoiceBilled=Number.isFinite(inv.amount)?inv.amount:(Number.isFinite(inv.qty)&&Number.isFinite(inv.price)?inv.qty*inv.price:NaN);
        const overcharge=Number.isFinite(invoiceBilled)?Math.max(0,invoiceBilled-expectedNet):NaN;
        candidate=overcharge;
        if(paymentRows.length>0&&Number.isFinite(inv.amount)){
          paymentExcessCandidate=Math.max(0,paid-expectedNet);
          status=paymentExcessCandidate>0?'payment_excess_candidate':(candidate>0?'invoice_excess_unverified':'reviewed_no_excess');
        }else status=candidate>0?'invoice_excess_unpaid_or_unverified':'review';
      }
      if(credited>0)findings.push({code:'credit_present',label:'Supplier credit included',detail:'Matched credit records total '+money(credited,currency)+' and are netted from the expected amount. Confirm the credit belongs to this invoice and is not already reflected in the PO/invoice.'});
      if(paymentRows.length===0)findings.push({code:'payment_unverified',label:'Payment status not supplied',detail:'No matching payment row was supplied. The product cannot claim a paid overpayment.'});
      if(canPrice&&canQty&&candidate>0)findings.push({code:'excess_candidate',label:'Potential invoice excess',detail:'Calculated invoice excess is '+money(candidate,currency)+' before confirming taxes, freight, tolerances, amendments and payment allocation.'});
      if(Number.isFinite(paymentExcessCandidate)&&paymentExcessCandidate>0)findings.push({code:'payment_excess',label:'Payment exceeds reconstructed net expected amount',detail:'Matched payments exceed the reconstructed net amount by '+money(paymentExcessCandidate,currency)+'. Human review is still required before a recovery claim.'});
      const sourceRows={invoice:inv.sourceRow,po:poRows.map(p=>p.sourceRow),receipts:rRows.map(r=>r.sourceRow),payments:paymentRows.map(p=>p.sourceRow),credits:creditRows.map(c=>c.sourceRow),amendments:applicableAmendments.map(a=>a.sourceRow)};
      return {id:'LT-'+String(inv.sourceRow).padStart(4,'0'),invoice:inv.invoice||'(missing)',supplier:inv.supplier||'(missing)',po:inv.po||'(missing)',item:inv.item||'(missing)',currency,qty:inv.qty,invoicePrice:inv.price,invoiceAmount:Number.isFinite(inv.amount)?inv.amount:(Number.isFinite(inv.qty)&&Number.isFinite(inv.price)?inv.qty*inv.price:NaN),qtyOrdered,qtyReceived:received,poPrice,paid:paymentRows.length?paid:NaN,credits:credited,expectedNet,candidate,paymentExcessCandidate,status,findings,sourceRows,invoiceDate:inv.date||'',paymentCount:paymentRows.length,creditCount:creditRows.length};
    });
    return {results,summary:{invoiceLines:results.length,flagged:results.filter(r=>r.findings.some(f=>['excess_candidate','payment_excess','price_over_po','qty_over_ordered','qty_over_received'].includes(f.code))).length,paymentExcessCandidates:results.filter(r=>Number.isFinite(r.paymentExcessCandidate)&&r.paymentExcessCandidate>0).length,unverifiedPayments:results.filter(r=>!Number.isFinite(r.paid)).length,invoiceExcess:results.reduce((s,r)=>s+(Number.isFinite(r.candidate)?r.candidate:0),0),paymentExcess:results.reduce((s,r)=>s+(Number.isFinite(r.paymentExcessCandidate)?r.paymentExcessCandidate:0),0)}};
  }
  root.LedgerTraceCore={parseCSV,normalize,analyze,money};
})(typeof window!=='undefined'?window:globalThis);
