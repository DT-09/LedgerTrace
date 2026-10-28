const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
if (!scripts.length) throw new Error('No script blocks found in index.html');
for (const [i, match] of scripts.entries()) {
  const attrs = match[1] || '';
  const body = match[2] || '';
  if (/\bsrc\s*=/.test(attrs) || !body.trim()) continue;
  new vm.Script(body, { filename: 'index.html inline script #' + (i + 1) });
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
console.log('HTML checks passed: inline scripts parse; original workbench, evidence inspector, report, review workflow, contact builder and recovery workflow are present.');
