# Caseweft

**AP exception evidence control.** Caseweft is a local-first workbench for finance teams that need to reconstruct and document parked supplier-invoice exceptions from supported exports.

## Product position

Caseweft is a vendor-neutral second-pass evidence workbench—not an ERP, invoice-capture suite, payment platform or autonomous auditor. Its narrow job is to turn fragmented invoice, approved-PO and goods-receipt exports into reviewable exception cases. Supported optional payment, supplier-credit and PO-amendment records can extend the evidence chain.

The buyer is an AP Manager, P2P process owner or Financial Controller at a distributor, wholesaler or manufacturer with a recurring PO-backed exception queue and usable line-level exports.

## Live capabilities

- Invoice-to-approved-PO and invoice-to-receipt comparisons.
- Duplicate candidates, missing references, unmatched records and supplier conflicts.
- Quantity, unit-price and line-arithmetic checks.
- Supported payment, supplier-credit and PO-amendment evidence.
- Currency, allocation, supplier-identity and amendment-effectivity gates that withhold unsafe calculations.
- Source-row references, triggered-rule explanations, reviewer notes, CSV worklist and print-ready report.
- Passphrase-protected local cycle archives and period-to-period comparison by supplier, PO, item and rule.

A triggered rule is a candidate discrepancy, not proof of supplier fault, loss, overpayment or recovered cash. A line with no triggered rule means only that the configured checks did not flag it.

## Commercial offer

**Paid, fixed-scope evaluation:** one supplier or one defined parked-invoice queue; one period or backlog window; up to 500 invoice, PO and receipt lines per source, subject to file-fit review. Deliverables: prioritised exception worklist, source-row evidence, comparison explanations, unresolved questions, disclosed limitations and reviewer handoff. Scope, fee, delivery date, data handling and acceptance criteria must be agreed in writing before work begins. The earlier USD 500 figure was a pricing hypothesis, not validated willingness to pay; do not present it as an established market price.

The recurring product direction is a monthly AP exception-control workspace. **That is not the current deployment.** The live workbench has no authenticated customer accounts, tenant isolation, persistent cloud workspaces, shared team review, subscription entitlement or payment checkout. Do not market it as recurring SaaS or accept recurring SaaS payments until those controls exist and are tested.

## Data handling

Selected CSVs are parsed and processed in the browser tab. The inquiry API stores contact and scope metadata only; it does not accept accounting files. An optional cycle archive contains findings, compared values, source-row references and reviewer notes—not the original CSV files—and is encrypted in the browser with AES-256-GCM using a passphrase-derived key before download. The archive is not uploaded to Caseweft. A lost passphrase cannot be recovered. This describes application behaviour; it is not a security certification or a claim that the browser makes no network requests.

Do not send accounting files through the inquiry form, ordinary email or WhatsApp. An approved transfer method, written scope and appropriate data-processing terms are required before confidential buyer records are accepted.

## Explicit exclusions

Supplier-statement-to-AP-ledger reconciliation, ERP integrations, automatic payment holds, approvals, postings, supplier contact, autonomous fraud determinations, currency conversion, tax treatment, guaranteed savings, recovered-cash claims, customer-validated accuracy and customer references are not claimed.

## Run and test

Static Cloudflare Pages site; repository root is the output directory; no build step. Run:

```sh
node tests/site-readiness.test.js
node tests/recovery-core.test.js
node tests/check-inline-scripts.js
```

## Name and legal status

Caseweft is a working product name. Trademark, company-name, domain and legal clearance have not been established.
