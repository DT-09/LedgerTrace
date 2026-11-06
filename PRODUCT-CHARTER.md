# Proofrail — Product Charter

**Category:** Accounts-payable exception intelligence. **Buyer:** AP Manager, P2P Process Owner or Financial Controller at a distributor, wholesaler or manufacturer.

## Problem
A defined queue of parked supplier invoices cannot be cleared efficiently because invoice, PO and goods-receipt evidence is fragmented, incomplete or inconsistent. Reviewers must reconstruct the case across separate exports and preserve a defensible handoff.

## Promise
**Find the blockage. Establish the evidence. Resolve the case.** Proofrail connects supported source records into an inspectable exception case. It shows what was compared, which rule triggered, which source rows support the finding, what is missing and what remains unresolved. It is an evidence workbench—not an ERP, payment system, autonomous auditor or fraud verdict engine.

## Primary workflow
1. Load invoice, approved PO and goods-receipt CSVs.
2. Validate identifiers, numeric values, supplier identity, currency and supported fields.
3. Connect records using supported PO + item relationships.
4. Surface candidate exceptions with rule, compared values and source-row references.
5. Record reviewer status, action and notes.
6. Export the prioritised worklist and print-ready report.

The extended engine accepts supported payment, supplier-credit and PO-amendment evidence. Candidates are not confirmed losses or recoveries.

## Initial paid offer
**Parked Invoice & Three-Way Match Evidence Review:** one supplier or defined parked-invoice queue, one agreed period, up to 500 invoice, PO and receipt lines per source, subject to file-fit review. Deliverables: prioritised worklist, source-row evidence, comparison explanations, data-quality limitations, unresolved questions and reviewer handoff. Fee, timeline, exclusions, data handling and acceptance criteria must be agreed in writing before work starts. USD 500 is an internal hypothesis, not validated pricing. No unpaid custom analysis of buyer records.

## Data boundary
Selected CSVs are processed in the browser tab; accounting CSV contents are not uploaded to the server by the current workbench. This is not a security certification or a claim that the browser makes no network requests. Inquiry metadata is stored only when D1 is configured. Do not accept confidential files before an authorised contract and approved data-transfer process exist.

## Explicit non-claims
Supplier-statement-to-AP-ledger reconciliation is not implemented. No ERP integrations, automatic payment holds/approvals/postings, supplier contact, autonomous fraud decision, guaranteed savings or cash recovery. No customer-validated accuracy, reference, paid customer or verified outcome without evidence. No currency conversion, tax treatment, robust supplier-master resolution, full split/merged-line matching or complete partial-payment accounting.

A line with no triggered rule means only that current configured checks did not flag it.