const assert = require('node:assert/strict');
require('../recovery-core.js');
const core = globalThis.LedgerTraceCore;
assert.ok(core, 'core API is exported');

const parsed = core.parseCSV('invoice_number,supplier,description,amount\nINV-1,Acme,"Valve, brass",12.50\nINV-2,Acme,"quoted ""part""",9');
assert.equal(parsed.length, 2);
assert.equal(parsed[0].description, 'Valve, brass');
assert.equal(parsed[1].description, 'quoted "part"');

function rows(text) { return core.parseCSV(text); }
function analyze(invoice, po, receipt, payment='', credit='', amendment='') {
  return core.analyze({
    invoices: rows(invoice),
    pos: rows(po),
    receipts: rows(receipt),
    payments: payment ? rows(payment) : [],
    credits: credit ? rows(credit) : [],
    amendments: amendment ? rows(amendment) : []
  });
}
const inv = 'invoice_number,supplier,po_number,item_code,quantity,unit_price,line_amount,currency,invoice_date\nINV-1,Acme,PO-1,SKU-1,10,12,120,USD,2026-01-10';
const po = 'po_number,supplier,item_code,quantity,unit_price,currency\nPO-1,Acme,SKU-1,10,10,USD';
const grn = 'receipt_number,po_number,supplier,item_code,quantity\nGRN-1,PO-1,Acme,SKU-1,10';
let out = analyze(inv, po, grn, 'payment_id,invoice_number,supplier,paid_amount,currency\nPAY-1,INV-1,Acme,120,USD');
assert.equal(out.results[0].candidate, 20);
assert.equal(out.results[0].confirmedOverpayment, 20);
assert.equal(out.summary.paymentExcess, 20);

out = analyze(inv, po, grn);
assert.equal(out.results[0].candidate, 20);
assert.ok(Number.isNaN(out.results[0].confirmedOverpayment), 'no payment evidence must not imply paid overpayment');

out = analyze(inv, po, grn, 'payment_id,invoice_number,supplier,paid_amount,currency\nPAY-1,INV-1,Acme,120,USD', 'credit_note_number,invoice_number,supplier,credit_amount,currency\nCN-1,INV-1,Acme,10,USD');
assert.equal(out.results[0].credits, 10);
assert.equal(out.results[0].expectedNet, 90);
assert.equal(out.results[0].confirmedOverpayment, 30);

const wrongSupplier = 'po_number,supplier,item_code,quantity,unit_price,currency\nPO-1,Other Co,SKU-1,10,10,USD';
out = analyze(inv, wrongSupplier, grn, 'payment_id,invoice_number,supplier,paid_amount,currency\nPAY-1,INV-1,Acme,120,USD');
assert.ok(Number.isNaN(out.results[0].candidate), 'supplier conflict must prevent quantification');
assert.ok(out.results[0].findings.some(f => f.code === 'supplier_mismatch'));

const invMulti = 'invoice_number,supplier,po_number,item_code,quantity,unit_price,line_amount,currency\nINV-2,Acme,PO-1,SKU-1,5,10,50,USD\nINV-2,Acme,PO-2,SKU-2,5,10,50,USD';
const poMulti = 'po_number,supplier,item_code,quantity,unit_price,currency\nPO-1,Acme,SKU-1,5,10,USD\nPO-2,Acme,SKU-2,5,10,USD';
const grnMulti = 'receipt_number,po_number,supplier,item_code,quantity\nGRN-1,PO-1,Acme,SKU-1,5\nGRN-2,PO-2,Acme,SKU-2,5';
out = analyze(invMulti, poMulti, grnMulti, 'payment_id,invoice_number,supplier,paid_amount,currency\nPAY-2,INV-2,Acme,100,USD');
assert.equal(out.results.length, 2);
assert.equal(out.results[0].paid + out.results[1].paid, 100, 'invoice-level payments should be allocated, not duplicated per line');

console.log('LedgerTrace Recovery tests passed (CSV quoting, price excess, payment evidence, credits, supplier conflict, multi-line allocation).');
