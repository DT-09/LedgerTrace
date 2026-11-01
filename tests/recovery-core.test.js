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
assert.equal(out.results[0].paymentExcessCandidate, 20);
assert.equal(out.summary.paymentExcess, 20);
assert.equal(out.results[0].sourceRows.invoice, 2, 'invoice evidence preserves the CSV source row');
assert.deepEqual(out.results[0].sourceRows.po, [2], 'PO evidence preserves the CSV source row');
assert.deepEqual(out.results[0].sourceRows.receipts, [2], 'receipt evidence preserves the CSV source row');

out = analyze(inv, po, grn);
assert.equal(out.results[0].candidate, 20);
assert.ok(Number.isNaN(out.results[0].paymentExcessCandidate), 'no payment evidence must not imply paid overpayment');

out = analyze(inv, po, grn, 'payment_id,invoice_number,supplier,paid_amount,currency\nPAY-1,INV-1,Acme,120,USD', 'credit_note_number,invoice_number,supplier,credit_amount,currency\nCN-1,INV-1,Acme,10,USD');
assert.equal(out.results[0].credits, 10);
assert.equal(out.results[0].expectedNet, 90);
assert.equal(out.results[0].candidate, 30);
assert.equal(out.results[0].paymentExcessCandidate, 30);

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


const wrongReceiptSupplier = 'receipt_number,po_number,supplier,item_code,quantity\nGRN-1,PO-1,Other Co,SKU-1,10';
out = analyze(inv, po, wrongReceiptSupplier, 'payment_id,invoice_number,supplier,paid_amount,currency\nPAY-1,INV-1,Acme,120,USD');
assert.ok(Number.isNaN(out.results[0].qtyReceived), 'receipt quantities from a different supplier must remain unavailable, not be represented as zero');
assert.ok(out.results[0].findings.some(f => f.code === 'receipt_supplier_mismatch'));
assert.ok(Number.isNaN(out.results[0].candidate), 'unmatched supplier receipts must block exposure calculation');

const wrongCurrencyPO = 'po_number,supplier,item_code,quantity,unit_price,currency\nPO-1,Acme,SKU-1,10,10,EUR';
out = analyze(inv, wrongCurrencyPO, grn, 'payment_id,invoice_number,supplier,paid_amount,currency\nPAY-1,INV-1,Acme,120,USD');
assert.ok(out.results[0].findings.some(f => f.code === 'currency_mismatch'), 'currency conflicts must be explicit');
assert.ok(Number.isNaN(out.results[0].candidate), 'currency conflicts must block amount calculations');
assert.ok(Number.isNaN(out.results[0].paid), 'currency conflicts must block payment aggregation');


const missingPaymentCurrency = 'payment_id,invoice_number,supplier,paid_amount\nPAY-1,INV-1,Acme,120';
out = analyze(inv, po, grn, missingPaymentCurrency);
assert.ok(out.results[0].findings.some(f => f.code === 'currency_mismatch'), 'missing payment currency must be explicit');
assert.ok(Number.isNaN(out.results[0].candidate), 'missing currency evidence must block amount-based calculations');


assert.throws(() => core.parseCSV('invoice_number,supplier\nINV-1,"Acme'), /unclosed quoted field/i);
assert.throws(() => core.parseCSV('invoice_number,supplier\nINV-1,Ac"me'), /quote inside an unquoted field/i);
assert.equal(core.normalize([{amount:'12,34'}], 'invoice')[0].amount, NaN, 'malformed thousands grouping must not be silently converted');
assert.equal(core.normalize([{amount:'1,234.56'}], 'invoice')[0].amount, 1234.56, 'valid thousands grouping remains supported');
const withBlankKeys = analyze(
  'invoice_number,supplier,po_number,item_code,quantity,unit_price,line_amount,currency\nINV-B,Acme,,,10,12,120,USD',
  'po_number,supplier,item_code,quantity,unit_price,currency\n,Acme,,10,10,USD',
  'receipt_number,po_number,supplier,item_code,quantity\nGRN-B,,Acme,,10'
);
assert.ok(Number.isNaN(withBlankKeys.results[0].candidate), 'blank PO/item keys must never join blank source rows');
assert.ok(withBlankKeys.results[0].findings.some(f => f.code === 'match_key_missing'));
const missingSupplier = analyze(
  'invoice_number,po_number,item_code,quantity,unit_price,line_amount,currency\nINV-MS,PO-1,SKU-1,10,12,120,USD',
  po,
  grn
);
assert.ok(Number.isNaN(missingSupplier.results[0].candidate), 'missing invoice supplier identity must block amount quantification');
assert.ok(missingSupplier.results[0].findings.some(f => f.code === 'supplier_identity_incomplete'));
const missingPOPrice = analyze(
  inv,
  'po_number,supplier,item_code,quantity,unit_price,currency\nPO-1,Acme,SKU-1,10,,USD',
  grn
);
assert.ok(Number.isNaN(missingPOPrice.results[0].candidate), 'a missing PO price must block the reconstructed expected amount');
assert.ok(missingPOPrice.results[0].findings.some(f => f.code === 'po_price_invalid'));
const invalidReceiptQty = analyze(
  inv,
  po,
  'receipt_number,po_number,supplier,item_code,quantity\nGRN-1,PO-1,Acme,SKU-1,not-a-number'
);
assert.ok(Number.isNaN(invalidReceiptQty.results[0].candidate), 'an invalid receipt quantity must not be treated as zero');
assert.ok(invalidReceiptQty.results[0].findings.some(f => f.code === 'receipt_quantity_invalid'));
const invalidPaymentAmount = analyze(
  inv, po, grn,
  'payment_id,invoice_number,supplier,paid_amount,currency\nPAY-1,INV-1,Acme,,USD'
);
assert.ok(Number.isNaN(invalidPaymentAmount.results[0].paymentExcessCandidate), 'an invalid payment amount must block payment-excess calculation');
assert.ok(invalidPaymentAmount.results[0].findings.some(f => f.code === 'payment_amount_invalid'));
const physicalRows = core.parseCSV('invoice_number,supplier\n\nINV-1,Acme\n');
assert.equal(physicalRows[0].__row, 3, 'evidence row references must retain physical CSV line numbers after blank lines');

const wrongSupplierPayment = 'payment_id,invoice_number,supplier,paid_amount,currency\nPAY-2,INV-1,Other Co,120,USD';
out = analyze(inv, po, grn, wrongSupplierPayment);
assert.ok(Number.isNaN(out.results[0].paymentExcessCandidate), 'a payment under a conflicting supplier identity must not support a payment-excess candidate');
assert.ok(out.results[0].findings.some(f => f.code === 'payment_supplier_conflict' && f.detail.includes('source row')));
const wrongSupplierCredit = 'credit_note_number,invoice_number,supplier,credit_amount,currency\nCN-2,INV-1,Other Co,10,USD';
out = analyze(inv, po, grn, '', wrongSupplierCredit);
assert.ok(Number.isNaN(out.results[0].candidate), 'a credit under a conflicting supplier identity must block the net expected amount');
assert.ok(out.results[0].findings.some(f => f.code === 'credit_supplier_conflict' && f.detail.includes('source row')));

console.log('LedgerTrace Recovery tests passed (CSV quoting, source trace, price excess, payment evidence, credits, supplier conflicts, currency guards, multi-line allocation).');
