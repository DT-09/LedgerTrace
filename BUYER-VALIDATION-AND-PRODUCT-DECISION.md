# Parked Invoice Evidence Review — buyer validation and product decision

**Research date:** 4 November 2026  
**Repository:** DT-09/LedgerTrace  
**Decision status:** Product direction selected; willingness to pay for LedgerTrace itself remains unvalidated.

## 1. Product name and exact deliverable

**Parked Invoice Evidence Review**

This is the product name because it describes the precise workflow and output. LedgerTrace remains the product/company brand.

The product is a browser-side workbench for a finance/AP reviewer handling a defined queue of parked supplier invoice lines. It compares three buyer-provided CSV exports:

1. Supplier invoice lines.
2. Approved purchase-order lines.
3. Goods-receipt lines.

It returns:

- A prioritised candidate-exception register in CSV.
- Compared values and the rule that triggered each candidate.
- Invoice, PO and receipt source-row references where available.
- A list of missing, ambiguous, conflicting or excluded records.
- Reproducible price and quantity calculations where the inputs support them.
- A print-ready evidence report and human-review handoff.

A candidate exception is not a confirmed overpayment, liability, supplier breach or recoverable amount. The finance reviewer retains the decision.

The current public workbench processes selected CSV files in the buyer's browser. The code does not upload those selected CSV contents to a LedgerTrace server. It is not a multi-tenant SaaS, ERP integration, managed recovery audit firm or certified accounting system.

## 2. What the buyer pays for

The buyer is not paying for an AI dashboard, a generic anomaly score or a promise of recovered cash.

The purchase hypothesis is a defined second-pass review capability for a parked-invoice queue:

- Make the queue easier to triage.
- Expose the precise invoice/PO/receipt comparison behind each candidate.
- Keep unresolved and unsupported cases visible.
- Give a reviewer an exportable evidence trail.
- Reduce the manual effort of assembling and explaining the first-pass exception list.

The buyer must compare this against its actual current process, not an invented savings benchmark.

## 3. What public evidence establishes

### Actual spend in the adjacent category

- **Leeds City Council:** a Spend Recovery Audit Service contract was awarded to Liberata UK Limited. The public award record reports £27,000 over two years. Scope: review historical payments to identify overpayments, duplicate payments and unclaimed credit balances. This is a service contract, not a LedgerTrace software sale.  
  Source: https://www.stotles.com/tenders/2025/W14/spend-recovery-audit-service-leeds-city-council

- **Coventry City Council:** its 2026 Accounts Payable Recovery Audit procurement sought a provider to identify, validate and recover monies owed and report root causes. The award was subsequently made to Liberata UK Limited. This demonstrates a public buyer purchasing an established recovery-audit service; it does not establish that a new software vendor qualifies.  
  Sources: https://www.sell2wales.gov.wales/search/show/search_view.aspx?ID=MAY621146&catID= and https://www.justskim.ai/tenders/ocds-h6vhtk-06a60b

- **Xelix:** the UK Government Digital Marketplace lists its Accounts Payable Control Centre at £40,000 per licence. The service listing includes ongoing payment audit, supplier statement reconciliation, retrospective AP audit, reporting and vendor-file controls. This is an enterprise product price reference, not a price comparable to the narrower LedgerTrace workbench.  
  Source: https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/685006728337076

### Evidence of the workflow inside finance teams

- **SBFM:** its AP Manager vacancy described approximately 800 supplier invoices per month, PO/invoice discrepancies, payment delays and supplier statement reconciliation. This is a workflow and workload signal, not evidence of a current external software budget.  
  Source: https://careers.sb-fm.co.uk/vacancies/23742/accounts-payable-manager.html

- **Sysco GB:** its AP Account Handler vacancy described parked invoices that do not match approved and goods-received POs, supplier statement reconciliation and unresolved items. This is a strong workflow-fit signal, not a purchase commitment.  
  Source: https://jobs.smartrecruiters.com/syscogb/744000149876669

- **APQC:** reports a cross-industry median cost of $6 per AP invoice based on its benchmark population. This is total AP process cost, not the avoidable cost of a parked queue and not savings attributable to LedgerTrace.  
  Source: https://www.apqc.org/What-Is-the-Average-Cost-to-Process-an-Invoice

## 4. What this evidence does not establish

As of this research date, the reviewed records do not establish:

- A paying LedgerTrace customer.
- An accepted purchase order or paid evaluation.
- A buyer who has confirmed a current parked-invoice backlog and budget.
- A validated LedgerTrace price.
- Customer-data accuracy or false-positive performance.
- Repeat purchase or measurable labour savings.
- Enterprise procurement readiness, security certification or ERP compatibility.

Do not turn adjacent-market spending into LedgerTrace revenue or a claim of proven demand.

## 5. Chosen initial buyer

**Primary buyer hypothesis:** an AP outsourcing/accounting service provider or finance operations team that handles recurring parked-invoice queues and can export invoice, approved PO and goods-receipt lines to CSV.

**Economic buyer:** AP Director, Finance Operations Director, Financial Controller or service-line owner.

**Operational user:** AP Manager, purchase-ledger lead or reconciliation analyst.

**Required buying trigger:** a named queue, an accountable reviewer, a measurable manual handling burden, accessible exports and a decision that the review must support.

Do not pursue an organisation merely because it is large or has many invoices. Do not treat a job vacancy as a qualified opportunity.

## 6. Product boundary

### Supported in the current workbench

- CSV invoice, purchase-order and goods-receipt inputs.
- Header normalization and supported field aliases.
- Exact duplicate invoice-line candidates.
- Missing PO references and unmatched PO lines.
- Supplier mismatch flags.
- Invoice quantity above PO quantity.
- Unit-price differences.
- Invoice line amount arithmetic checks.
- Missing goods receipt and invoiced quantity above compatible received quantity.
- PO lines without invoice matches and receipts without PO matches.
- Source-row references, review notes, CSV export and print-ready report.

### Explicitly not represented as live

- XLSX or PDF ingestion.
- Supplier statement-to-AP-ledger reconciliation.
- Full supplier master-data resolution.
- Robust split/merged-line matching.
- Currency conversion, full tax/freight treatment or all tolerance profiles.
- Complete partial-payment and credit allocation.
- ERP integrations, write-back, automated payment blocking or supplier communications.
- Multi-tenant accounts, role-based enterprise tenancy or certified security controls.

The separate payment/credit recovery workbench has additional limits documented in README.md. Do not expand the paid offer to include those checks unless the exact dataset and calculation have been validated.

## 7. Inbound acquisition without cold outreach

An inbound path can reduce dependence on cold outreach. It cannot guarantee a buyer or immediate revenue.

The website should attract people already searching for the problem and let them qualify themselves:

1. An exact-intent page for "parked invoice review" and "invoice PO goods receipt mismatch".
2. A working, synthetic sample that demonstrates actual input fields, findings and exports.
3. A transparent product-boundary and data-handling explanation.
4. A buyer economics calculator that estimates the buyer's own manual review labour cost without claiming savings.
5. A commercial inquiry path that captures workflow, volume, source-file availability and buyer role.
6. Search indexing, structured metadata, a maintained sitemap and first-party conversion events.
7. A public buyer-evidence page that cites procurement records and clearly separates category demand from LedgerTrace validation.

SEO is a long-term channel. Search indexing does not guarantee traffic. The inquiry inbox must be configured and tested before claiming that inquiries are stored. Current Cloudflare health previously reported inboxConfigured=false and emailNotificationsConfigured=false; the owner must configure D1 and optional email notification secrets and test a real submission.

No buyer should be counted until there is a defined need, authorized data, an approved scope, a lawful commercial arrangement and confirmed payment.

## 8. Revenue gates

Do not publish a price based on competitor pricing or an internal target.

A price becomes defensible only after we know:

- The buyer's present handling time and loaded labour cost.
- The size and age of the parked queue.
- Which current controls already catch the exceptions.
- The proportion of rows that can be evaluated with the available exports.
- False positives, misses and reviewer time against a human-reviewed reference set.
- The buyer's willingness to pay for the actual output.

The product must not claim savings equal to the total queue cost. The calculator on the buyer page estimates current manual handling cost only.

Before commercial operation, a legally authorized adult/business representative must handle customer contracts, payment-provider accounts, data-processing terms and any transfer of confidential financial records. Do not bypass age, identity or provider requirements.

## 9. Production-readiness gates

The current product is a working browser-side pilot, not a production-ready enterprise platform. A release may be called production-ready for its stated scope only after:

- The supported CSV schema and failure modes are documented.
- Known-answer tests cover correct detections and correct non-detections.
- Human-reviewed reference data validates precision and misses for any published performance claim.
- CSV exports and print/PDF output are verified across supported browsers.
- Large files, malformed input, encoding, dates, decimals and currencies are tested.
- Keyboard access, screen-reader labels and mobile layout are verified.
- The privacy notice and data-retention boundaries match actual runtime behaviour.
- Inquiry storage and notifications are configured and tested.
- Deployment and rollback are documented.
- Commercial scope, delivery responsibility and lawful payment handling are operational.

## 10. Decision

Build and position the complete **Parked Invoice Evidence Review** around the exact parked-invoice workflow. Do not broaden it into a generic supplier-payment intelligence platform.

The adjacent market has real spend. LedgerTrace-specific willingness to pay remains unproven. The next proof is a buyer who confirms a real queue, accepts a defined scope and pays for the actual deliverable—not another feature, website impression or hypothetical ROI.
