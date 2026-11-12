# Caseweft — Product Charter

**Category:** AP exception evidence control.  
**Primary buyer:** AP Manager, P2P Process Owner or Financial Controller at a distributor, wholesaler or manufacturer.  
**Primary job:** reconstruct a defined population of parked PO-backed supplier invoices into evidence-backed cases a finance reviewer can disposition.

## Product promise

**Turn the invoice hold into a reviewable case.**

Caseweft compares supported invoice lines with approved purchase orders and goods-receipt quantities, then preserves the compared values, source rows, triggered rules, data-quality conflicts and unresolved questions. Supported payment, supplier-credit and PO-amendment records can extend the evidence chain when supplied and correctly linked.

It is a second-pass evidence workbench. It is not an ERP, invoice-capture suite, payment system, autonomous auditor or fraud-verdict engine.

## Recurring workflow vision

1. Open an accounting-period review cycle.
2. Import supported invoice, approved-PO and goods-receipt exports.
3. Validate identifiers, supplier identity, quantities, prices, currency and required fields.
4. Connect records using supported PO + item relationships.
5. Inspect candidate exceptions with compared values, triggered rules and source-row evidence.
6. Record a human reviewer disposition, owner and explanation.
7. Compare repeated supplier, PO, item and rule patterns with prior periods.
8. Export the period worklist and evidence pack.

## Current implementation

The current deployment is a browser-side workbench. Selected CSV files are parsed and processed in the browser tab. Review notes are held in the current session until exported. The workbench can create passphrase-protected local cycle archives and compare an imported prior cycle by supplier, PO, item and rule.

The current deployment does **not** provide authenticated customer accounts, tenant isolation, persistent cloud workspaces, shared team access, durable server-side review history, scheduled imports, ERP integrations, subscription entitlements, checkout or payment-status tracking. It is a demonstrable local-first workbench, not production SaaS and not approved for confidential customer financial records.

## Initial paid evaluation

- One supplier or one clearly defined parked-invoice queue.
- One accounting period or backlog window.
- Up to 500 invoice, PO and goods-receipt lines per source, subject to file-fit review.
- Payment, credit and amendment records only where the agreed question requires them.
- One consistent currency for amount-based conclusions.
- Deliverables: prioritised exception worklist, source-row evidence, comparison explanations, unresolved questions, disclosed limitations and reviewer handoff.
- Scope, fee, delivery date, data handling and acceptance criteria agreed in writing before work begins.
- No promise of recovered cash, savings or error-free detection.

## Build gates before recurring SaaS

1. **Identity and tenancy:** verified sign-in, organisation boundaries, least-privilege access and tenant-isolation tests.
2. **Persistent review model:** period cycles, immutable source references, case dispositions, ownership and audit events.
3. **Data protection:** approved upload/processing design, encryption, retention/deletion controls, backups, access logging and documented data-processing terms.
4. **Repeat-cycle intelligence:** supplier and item recurrence across periods without silently merging ambiguous records.
5. **Operational reliability:** import limits, malformed-file handling, known-answer tests, measured false positives and misses, export validation, monitoring and rollback.
6. **Commercial entitlement:** lawful billing and subscription entitlement, cancellation handling and clear usage limits.
7. **Customer validation:** buyer-approved reference data, human-reviewed expected results and documented acceptance.

## Evidence and accounting boundaries

A triggered rule is a candidate discrepancy, not proof of supplier fault, loss, overpayment or recovered cash. A line with no triggered rule means only that configured checks did not flag it. Supplier-statement-to-ledger reconciliation is not implemented. Do not claim ERP integrations, payment holds, approvals, postings, supplier contact, autonomous fraud determinations, currency conversion, tax treatment, guaranteed savings, paid customers, customer references or verified outcomes without evidence.
