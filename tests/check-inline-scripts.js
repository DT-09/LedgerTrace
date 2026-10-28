const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(match => !/\bsrc\s*=/.test(match[1]) && !/\btype\s*=\s*["']application\/ld\+json["']/i.test(match[1]));
if (inlineScripts.length < 2) throw new Error('Expected both primary and recovery inline script blocks');
inlineScripts.forEach((match, index) => {
  const id = (match[1].match(/\bid="([^"]+)"/) || [])[1] || 'primary-inline-script';
  new vm.Script(match[2], { filename: id + '-' + index + '.js' });
});
if (!html.includes('<script id="ledgertrace-recovery-extension">')) {
  throw new Error('Recovery extension script block is missing');
}
const primaryReconcile = html.slice(html.indexOf('function reconcile(){'), html.indexOf('function renderResults(){'));
for (const required of ['po_ambiguous', 'receipt_supplier_mismatch', 'supplierConflict', 'supplier_missing', 'currency_mismatch']) {
  if (!primaryReconcile.includes(required)) throw new Error('Primary reconciliation safety guard missing: ' + required);
}
if (primaryReconcile.includes('po=pls[0]')) throw new Error('Primary reconciliation must not silently select the first ambiguous PO row');
if (html.includes("style:'currency',currency:'USD'")) throw new Error('Primary workbench must not silently label input amounts as USD');
if (html.includes("fixed fee")) throw new Error('Public evaluation copy must not imply a fixed fee');
if (/\$100/.test(html)) throw new Error('Public evaluation copy must not publish the private minimum fee');
if (!html.includes('Fees are negotiated privately against record volume, data quality, checks and review effort')) throw new Error('Negotiated commercial terms must be stated clearly');
for (const sampleCount of ['Sample invoices · 8 rows', 'Sample POs · 6 rows', 'Sample receipts · 5 rows']) {
  if (!html.includes(sampleCount)) throw new Error('Sample row count label is missing or incorrect: ' + sampleCount);
}
const requiredExistingIds = [
  'heroSampleBtn', 'sampleBtn', 'resetBtn', 'invoiceFile', 'poFile',
  'receiptFile', 'runBtn', 'clearBtn', 'results', 'evidencePdfBtn',
  'exportBtn', 'reportExport', 'inspector', 'reviewStatus', 'saveReview',
  'contactForm', 'generateBrief', 'contactFromBuilder'
];
for (const id of requiredExistingIds) {
  if (!html.includes('id="' + id + '"')) throw new Error('Existing engineered feature missing: ' + id);
}
const recoveryIds = [
  'recovery-investigation', 'recInvoices', 'recPos', 'recReceipts',
  'recPayments', 'recCredits', 'recAmendments', 'recRunBtn',
  'recCaseFindings', 'recSaveCase', 'recExportCase', 'recExportAll'
];
for (const id of recoveryIds) {
  if (!html.includes('id="' + id + '"')) throw new Error('Recovery workflow feature missing: ' + id);
}
if (!html.includes('<script src="./recovery-core.js"></script>')) {
  throw new Error('Recovery analysis engine is not loaded by index.html');
}
console.log('HTML checks passed: recovery script parses; original workbench, evidence inspector, report, review workflow, contact builder and recovery workflow are present.');
