/* LedgerTrace — supplier overcharge recovery layer.
   Exposure is a review estimate, never a claim of confirmed loss or recovered cash. */
(function(){
  const exactInvoiceKey = r => [id(r.supplier),id(r.invoice),id(r.po),id(r.item),
    Number.isFinite(r.qty)?r.qty:'',Number.isFinite(r.price)?r.price:'',
    Number.isFinite(r.amount)?r.amount:'',id(r.currency)].join('|');
  function reconcile(){
    hideError();
    try{
      if(!state.invoices.length||!state.pos.length||!state.receipts.length)
        throw Error('Load sample data or select all three CSV files before running reconciliation.');
      validate(state.invoices,'invoice');
      validate(state.pos,'purchase order');
      validate(state.receipts,'goods receipt');

      const poGroups=group(state.pos,key), receiptGroups=group(state.receipts,key);
      const invoiceDuplicates=group(state.invoices,exactInvoiceKey);
      const duplicateKeys=new Set([...invoiceDuplicates].filter(([,rows])=>rows.length>1).map(([k])=>k));
      const duplicateOrdinal=new Map();
      const results=state.invoices.map(inv=>{
        const findings=[], k=key(inv), poRows=poGroups.get(k)||[], receiptRows=receiptGroups.get(k)||[];
        const poQty=poRows.reduce((sum,p)=>sum+p.qty,0);
        const receiptQty=receiptRows.reduce((sum,r)=>sum+r.qty,0);
        const prices=[...new Set(poRows.filter(p=>Number.isFinite(p.price)).map(p=>p.price))];
        const poPrice=prices.length===1?prices[0]:NaN;
        const suppliers=[...new Set(poRows.map(p=>id(p.supplier)).filter(Boolean))];
        const duplicateKey=exactInvoiceKey(inv);
        const occurrence=(duplicateOrdinal.get(duplicateKey)||0)+1;
        duplicateOrdinal.set(duplicateKey,occurrence);
        const isExactDuplicate=duplicateKeys.has(duplicateKey)&&occurrence>1;

        if(isExactDuplicate) findings.push({code:'exact_duplicate_invoice_line',label:'Exact duplicate invoice line',detail:'This line repeats the same supplier, invoice number, PO, item, quantity, price and amount as an earlier input row. Confirm whether it was already booked or paid.'});
        if(!inv.po) findings.push({code:'missing_po_reference',label:'Missing PO reference',detail:'The invoice does not contain a purchase-order reference.'});
        if(!poRows.length) findings.push({code:'po_not_found',label:'No matching PO line',detail:'No PO line matches PO '+(inv.po||'(missing)')+' and item '+(inv.item||'(missing)')+'.'});
        if(poRows.length&&suppliers.length>1) findings.push({code:'ambiguous_po_supplier',label:'PO supplier is ambiguous',detail:'Multiple supplier names exist for this PO/item key. Supplier attribution needs review.'});
        else if(poRows.length&&inv.supplier&&poRows[0].supplier&&id(inv.supplier)!==id(poRows[0].supplier))
          findings.push({code:'supplier_mismatch',label:'Supplier mismatch',detail:'Invoice supplier '+inv.supplier+' differs from PO supplier '+poRows[0].supplier+'.'});
        if(poRows.length&&prices.length>1) findings.push({code:'ambiguous_po_price',label:'Multiple PO prices for the same item',detail:'Matching PO rows contain different unit prices. Price exposure is not quantified until the correct PO line is identified.'});
        if(poRows.length&&Number.isFinite(inv.qty)&&inv.qty>poQty)
          findings.push({code:'quantity_over_ordered',label:'Invoice quantity exceeds total ordered quantity',detail:'Invoiced '+inv.qty+' units; matching PO rows total '+poQty+'.'});
        if(poRows.length&&Number.isFinite(inv.price)&&Number.isFinite(poPrice)&&Math.abs(inv.price-poPrice)>.0101)
          findings.push({code:'price_mismatch',label:'Unit price differs from PO',detail:'Invoice unit price '+money(inv.price)+'; PO unit price '+money(poPrice)+'.'});
        if(Number.isFinite(inv.amount)&&Number.isFinite(inv.qty)&&Number.isFinite(inv.price)&&Math.abs(inv.amount-inv.qty*inv.price)>.02)
          findings.push({code:'line_amount_mismatch',label:'Invoice line amount inconsistency',detail:'Line amount does not equal quantity × unit price within 0.02 input-currency units.'});
        if(!receiptRows.length) findings.push({code:'receipt_missing',label:'No matching goods receipt',detail:'No receipt matches this PO and item.'});
        else if(Number.isFinite(inv.qty)&&inv.qty>receiptQty)
          findings.push({code:'quantity_over_received',label:'Invoice quantity exceeds total received quantity',detail:'Invoiced '+inv.qty+' units; matching receipt rows total '+receiptQty+'.'});

        let exposure=0, exposureKnown=false, exposureBasis=[];
        if(isExactDuplicate&&Number.isFinite(inv.amount)&&inv.amount>0){
          exposure=inv.amount; exposureKnown=true;
          exposureBasis.push('Potential duplicate line amount; verify invoice history and payment status.');
        } else if(poRows.length&&receiptRows.length&&prices.length===1&&Number.isFinite(inv.qty)&&Number.isFinite(inv.price)&&inv.qty>=0){
          const supportedQty=Math.max(0,Math.min(inv.qty,poQty,receiptQty));
          const priceExcess=Math.max(0,inv.price-poPrice)*supportedQty;
          const unsupportedQty=Math.max(0,inv.qty-Math.min(poQty,receiptQty));
          const quantityExcess=unsupportedQty*inv.price;
          exposure=priceExcess+quantityExcess;
          exposureKnown=true;
          if(priceExcess>0) exposureBasis.push('Price excess on quantity supported by both PO and receipts.');
          if(quantityExcess>0) exposureBasis.push('Invoice quantity above the lower of ordered and received quantity, valued at invoice unit price.');
        }
        if(isExactDuplicate) findings.push({code:'duplicate_invoice_identifier',label:'Repeated invoice line',detail:'An exact duplicate fingerprint was found; confirm prior booking/payment before treating the amount as exposure.'});
        const status=findings.length?'exception':'matched';
        return {...inv,status,findings,poQty:poRows.length?poQty:NaN,poPrice,receiptQty:receiptRows.length?receiptQty:NaN,
          poRows:poRows.map(p=>p.row),receiptRows:receiptRows.map(r=>r.row),risk:exposure,exposureKnown,
          exposureBasis,source:'invoice',isExactDuplicate};
      });

      state.pos.forEach(p=>{
        if(!state.invoices.some(i=>key(i)===key(p))) results.push({invoice:'—',supplier:p.supplier,po:p.po,item:p.item,qty:NaN,price:NaN,amount:NaN,status:'review',
          findings:[{code:'po_without_invoice',label:'PO line has no invoice match',detail:'This PO line does not match an invoice line in the current input.'}],
          poQty:p.qty,poPrice:p.price,receiptQty:NaN,row:p.row,risk:0,exposureKnown:false,exposureBasis:[],source:'po'});
      });
      state.receipts.forEach(r=>{
        if(!state.pos.some(p=>key(p)===key(r))) results.push({invoice:'—',supplier:r.supplier,po:r.po,item:r.item,qty:NaN,price:NaN,amount:NaN,status:'review',
          findings:[{code:'receipt_without_po',label:'Receipt has no PO match',detail:'This receipt row does not match a PO line in the current input.'}],
          poQty:NaN,poPrice:NaN,receiptQty:r.qty,row:r.row,risk:0,exposureKnown:false,exposureBasis:[],source:'receipt'});
      });
      state.results=results;state.runAt=new Date();renderResults();$('results').classList.remove('hidden');
      setMeta('runHint','Run complete. Review quantified candidates first; confirm source records and payment status before treating any amount as recoverable.');
      $('results').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    }catch(e){showError(e.message)}
  }
  window.reconcile=reconcile;
  const originalRenderResults=renderResults;
  window.renderResults=function(){
    originalRenderResults();
    const invoiceRows=state.results.filter(r=>r.source==='invoice');
    const quantified=invoiceRows.filter(r=>r.exposureKnown&&r.risk>0);
    const unknown=invoiceRows.filter(r=>r.status!=='matched'&&!r.exposureKnown);
    const total=quantified.reduce((sum,r)=>sum+r.risk,0);
    const label=document.querySelector('#mValue')?.parentElement?.querySelector('.metric-label');
    const note=document.querySelector('#mValue')?.parentElement?.querySelector('.metric-note');
    if(label) label.textContent='Potential excess exposure';
    if(note) note.textContent='Quantified candidates only; not confirmed loss';
    const summary=$('reportSummary');
    if(summary){
      const li=document.createElement('li');
      li.textContent=quantified.length+' invoice rows have a quantified candidate amount; '+unknown.length+' exception rows cannot be safely quantified from the available records.';
      summary.appendChild(li);
      const li2=document.createElement('li');
      li2.textContent='Potential excess exposure: '+money(total)+'. This estimate is based only on supported price/quantity excess and exact repeated invoice lines; verify source documents, credits, tolerance rules and payment status before claiming recovery.';
      summary.appendChild(li2);
    }
  };
  const caveat=$('reportCaveat');
  if(caveat)caveat.textContent='Potential exposure is quantified only where the supplied PO, receipt and invoice fields support a calculation. Exact duplicate lines are candidates, not proof of duplicate payment. Confirm credits, amendments, tolerances, tax, currency and payment status with the finance team.';
  const metricLabels=[...document.querySelectorAll('.metric-label')];
  const riskLabel=metricLabels.find(x=>x.textContent.toLowerCase().includes('indicative flagged line value'));
  if(riskLabel)riskLabel.textContent='Potential excess exposure';
})();