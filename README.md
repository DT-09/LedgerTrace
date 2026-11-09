# LedgerTrace

**Accounts-payable exception intelligence.** First commercial offer: **Parked Invoice & Three-Way Match Evidence Review**.

LedgerTrace investigates a defined population of parked supplier invoices by comparing invoice lines with PO lines and goods-receipt quantities. It preserves source rows, compared values, triggered rules, data-quality conflicts and unresolved questions for a finance reviewer.

## Try it
Open [the browser workbench](https://ledgertrace.pages.dev/workbench.html), load the synthetic sample, run the three-way comparison, inspect a finding and export the exception worklist. Sample data is illustrative, not a customer result.

## Supported workflow
- Invoice-to-PO and invoice-to-receipt comparisons.
- Duplicate invoice-line candidates, missing PO references and unmatched records.
- Supplier mismatches, quantity and unit-price discrepancies, and line arithmetic checks.
- Source-row references, rule explanations, review notes, CSV worklist and print-ready report.
- Encrypted local cycle archives and period-to-period recurrence comparison by supplier, PO, item and rule.
- Extended supported payment, credit-note and PO-amendment evidence.

A triggered rule is a candidate discrepancy, not proof of supplier fault, loss, overpayment or recovered cash. A line with no triggered rule means only that current configured checks did not flag it.

## Commercial model

**Entry evaluation:** one supplier or one defined parked-invoice queue; one agreed period; up to 500 invoice, PO and receipt lines per source, subject to file-fit review. Deliverables: prioritised exception worklist, source-row evidence, comparison explanations, unresolved questions, disclosed limitations and reviewer handoff. Scope, fee, delivery date, data handling and acceptance criteria are agreed in writing before work begins. USD 500 remains an internal pricing hypothesis, not validated demand or public pricing.

**Recurring product direction:** a monthly AP exception-control workspace. Each period, the customer opens a review cycle, imports the supported invoice, approved-PO and goods-receipt exports, reviews source-linked exceptions, records dispositions and compares recurring supplier issues with prior periods. The intended subscription value is continuity: period history, supplier-level recurrence, reviewer ownership and an exportable audit trail.

**Important implementation boundary:** the current workbench supports repeat use through passphrase-protected local cycle archives and period comparison. It does not provide authenticated customer accounts, tenant isolation, persistent cloud workspaces, shared team review, subscription entitlement or billing. Period history persists only when the customer exports and later imports an encrypted archive. Do not market this as multi-user SaaS.
## Data boundaries
Selected CSVs are parsed and processed in the browser tab. The app does not upload accounting CSV contents to the server. An optional cycle archive contains the resulting findings, compared values, source-row references and reviewer notes—not the original CSV files—and is encrypted in the browser with AES-256-GCM using a passphrase-derived key before download. The archive is not uploaded to LedgerTrace. A lost passphrase cannot be recovered. Store archives only in the customer's approved secure file repository. This describes application behaviour; it is not a security certification or a claim that the browser makes no network requests. Do not send accounting files through the inquiry form, ordinary email or WhatsApp. A separate authorised contract and approved data-transfer process are required before confidential buyer records are accepted. D1 stores inquiry metadata only when configured; it is not payment checkout.

## Explicit exclusions
Supplier-statement-to-AP-ledger reconciliation is not implemented. No ERP integrations, automatic payment holds, approvals, postings, supplier contact, autonomous fraud determination, currency conversion, tax treatment, guaranteed savings or recovery claims. No customer-validated accuracy, customer reference, paid-customer or verified-outcome claims without evidence.

## Run locally
Static Cloudflare Pages site; repository root is output directory; no build step. Run `node tests/site-readiness.test.js`, `node tests/recovery-core.test.js`, and `node tests/check-inline-scripts.js`.

## Name
LedgerTrace is a working name pending trademark, company-name, domain and legal clearance.