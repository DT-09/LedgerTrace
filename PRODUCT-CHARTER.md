# LedgerTrace — Product Charter

**Category:** Accounts-payable exception control.  
**Buyer:** AP Manager, P2P Process Owner or Financial Controller at a distributor, wholesaler or manufacturer.

## Product promise

**Every discrepancy needs evidence.**

LedgerTrace helps an AP team work a recurring queue of parked supplier invoices. It connects supported invoice, approved purchase-order and goods-receipt records; surfaces candidate exceptions; preserves the compared values and source rows; and gives a finance reviewer a defensible way to disposition each case.

It is an exception-review system. It is not an ERP, payment system, autonomous auditor or fraud-verdict engine.

## Recurring customer workflow

1. Open the current monthly or accounting-period review cycle.
2. Import supplier invoice lines, approved PO lines and goods-receipt lines.
3. Validate identifiers, supplier identity, quantities, prices, currency and supported fields.
4. Connect records using supported PO + item relationships.
5. Review candidate exceptions with triggered rules, compared values and source-row evidence.
6. Record a reviewer disposition, owner and explanation.
7. Compare repeated supplier or item exceptions with prior periods.
8. Export the period worklist and evidence pack for the customer's own records.

## Subscription value

The recurring value is continuity across accounting periods. The current workbench provides a local-first starting point: export a passphrase-protected cycle archive, then import it during the next period to compare repeated exception patterns. The intended subscription value is continuity across accounting periods:

- Portable encrypted review-cycle history and period-to-period comparison.
- Supplier-level recurrence and unresolved-case tracking.
- Reviewer ownership, disposition and notes.
- A traceable change history for each case.
- Repeatable monthly exports and management summaries.
- Consistent checks and disclosed data-quality limitations.

No public pricing is set. Pricing must be tested against the customer's invoice volume, review frequency, team size and current manual handling burden.

## Current implementation — do not overstate it

The current deployment is a browser-side workbench. Selected CSV files are parsed and processed in the browser tab. Review notes are held in the current session until exported. The workbench can create passphrase-protected local cycle archives and compare an imported prior cycle by supplier, PO, item and rule. The current application does **not** yet provide:

- Authenticated customer accounts or tenant isolation.
- Persistent cloud workspaces or shared team access.
- Server-side monthly history, shared supplier history or team-wide durable review dispositions; history is carried in customer-managed encrypted archive files.
- Scheduled imports, ERP integrations or automatic accounting actions.
- Subscription entitlements, checkout or payment-status tracking.
- A production-approved confidential-file transfer and retention process.

Therefore, the current deployment is a demonstrable pilot, not a recurring SaaS product and not yet suitable for confidential customer financial records.

## Build gates for a recurring release

1. **Identity and tenancy:** verified sign-in, organisation boundaries, least-privilege access and tenant-isolation tests.
2. **Persistent review model:** period cycles, immutable source references, case dispositions, ownership and audit events.
3. **Data protection:** approved upload/processing design, encryption, retention/deletion controls, backups, access logging and documented data-processing terms.
4. **Repeat-cycle intelligence:** supplier and item recurrence across periods without silently merging ambiguous records.
5. **Operational reliability:** import limits, malformed-file handling, known-answer tests, export validation, monitoring, rollback and support process.
6. **Commercial entitlement:** a lawful billing and subscription-entitlement mechanism, cancellation handling and clear usage limits.
7. **Customer validation:** buyer-approved reference data, human-reviewed expected results, measured false positives and misses, and documented acceptance.

Do not accept confidential buyer files until the data-handling and legal-operating gates are satisfied. A legally authorised adult/business representative must handle contracts, payment-provider accounts and data-processing obligations where required.

## Evidence and accounting boundaries

A triggered rule is a candidate discrepancy, not proof of supplier fault, loss, overpayment or recovered cash. A line with no triggered rule means only that current configured checks did not flag it.

Supplier-statement-to-AP-ledger reconciliation is not implemented. Do not claim ERP integrations, payment holds, approvals, postings, supplier contact, autonomous fraud determinations, currency conversion, tax treatment, guaranteed savings or recovered cash. Do not claim customer-validated accuracy, paid customers, customer references or verified outcomes without evidence.
