# LedgerTrace

LedgerTrace is the brand for **Parked Invoice Evidence Review**: a browser-based workbench for a defined queue of supplier invoice lines that are held because invoice, approved purchase-order and goods-receipt records do not agree. It compares supported CSV fields, explains candidate exceptions with source-row references, and exports a human-review worklist. The buyer retains all accounting decisions.

## Try the working sample

1. Open the site and select **Load sample & run analysis**.
2. Inspect duplicate invoice IDs, a unit-price difference, a receipt shortfall, an invoice quantity above the PO quantity, a missing PO reference, and a missing goods receipt.
3. Select any result to inspect compared values, triggered rules, and source CSV row references.
4. Export the exception CSV or use **Print / save evidence PDF** to open a print-ready report and choose **Save as PDF** in the browser's print dialog.

The sample is illustrative and does not represent customer results.

## Run it locally

Deploy this repository to Cloudflare Pages with the repository root as the project directory, no build command, and the output directory set to `/`. It is static HTML/CSS/JavaScript; no package install or build step is required. You can also open `index.html` directly in a modern browser.

## CSV inputs

Use one row per document line. Header names are normalized, so spaces, hyphens, and capitalization are tolerated. Each file is limited to 10 MB and 50,000 data rows. Upload one coherent dataset at a time; replacing an illustrative recovery sample clears the remaining sample sources to prevent mixed sample/buyer analysis.

- **Invoices:** `invoice_number`, `supplier`, `po_number`, `item_code`, `quantity`, `unit_price`; optional `line_amount`, `invoice_date`, `currency`.
- **Purchase orders:** `po_number`, `supplier`, `item_code`, `quantity`, `unit_price`.
- **Goods receipts:** `receipt_number`, `po_number`, `item_code`, `quantity`, `receipt_date`.

Common aliases such as `invoice_no`, `vendor`, `sku`, `qty`, `price`, `purchase_order_number`, and `grn` are accepted. Quantities and unit prices must be numeric. Use consistent currency and units across all three files. Amount-based summaries are withheld when currency is missing or mixed.

## Current checks

- Exact duplicate invoice-line candidates (separate lines on one invoice are not automatically duplicates).
- Missing PO references and missing matching PO lines.
- Supplier mismatches between invoice and PO.
- Invoiced quantity above ordered quantity.
- Unit-price differences greater than 0.01 in the input currency.
- Invoice line amount inconsistent with quantity × unit price.
- Missing goods receipt and invoiced quantity above total received quantity.
- PO lines without invoice matches and goods receipts without PO matches.

## Data handling

The current app reads selected CSV files through browser file APIs and processes them in the browser tab. The app code does not upload those CSV contents to a LedgerTrace server. Review notes are held in page memory for the current session. The page loads web fonts from Google, so this is not a claim that the browser makes no network requests. For initial evaluation, use synthetic or client-approved anonymized records.

## Inbound discovery

- The homepage and `parked-invoice-evidence-review.html` explain the exact Parked Invoice Evidence Review, its buyer fit, actual public procurement evidence and its current limitations.
- `invoice-reconciliation.html` is the product workflow page.
- `invoice-reconciliation-checklist.html` is an educational search-intent page for AP teams. It explains the review process without making unsupported savings or accuracy claims and links readers to the sample and evaluation offer.
- `sitemap.xml` lists the public pages; `robots.txt` points crawlers to that sitemap.

Search visibility takes time and is not guaranteed. The website can support self-serve discovery, but it cannot guarantee traffic, inquiries or payments. Buyer-specific willingness to pay remains unvalidated. The inquiry panel now posts contact and scope metadata to a same-origin Pages Function. When the Cloudflare D1 binding is configured, the endpoint stores the inquiry and can send an optional Resend alert. If the binding is absent or unavailable, the form clearly reports that nothing was stored and offers prefilled WhatsApp/email handoff links. It never accepts accounting files. Configure the D1 binding and verify a real test submission before relying on the inbox. See [CLOUDFLARE-PRODUCTION-SETUP.md](./CLOUDFLARE-PRODUCTION-SETUP.md) and [SALES-READINESS-AUDIT.md](./SALES-READINESS-AUDIT.md).

## Product: Parked Invoice Evidence Review

The product's exact output is a prioritised candidate-exception CSV, source-row evidence, compared values and triggered rules, a concise review report, unresolved/ambiguous record list, disclosed limitations and a human-review handoff. The current workbench processes the buyer's CSV files locally in the buyer's browser. It does not send those selected files to a LedgerTrace server.

The existing evaluation scope document uses one supplier or one defined queue, one accounting period, and up to 500 invoice lines, 500 PO lines and 500 goods-receipt lines each, subject to a file-fit check. This is a proposed scope boundary, not proof of a paid customer engagement or a validated price.

**Commercial status:** the public sample and CSV workbench are currently accessible without payment. There is no verified paid customer, accepted purchase order, payment checkout, validated willingness to pay or production managed-review operation. Do not advertise a fixed price, guaranteed recovery or managed audit service. A paid commercial model must be validated with an actual buyer and supported by lawful contracting, payment and data-handling operations before it is represented as available.

**Initial fit check:** a written workflow review and synthetic demonstration. No free analysis of buyer records, no free custom exception report and no confidential files in the public inquiry form, ordinary email or WhatsApp. If the use case fits, issue a bounded paid scope.

This is a bounded investigation service, not a production multi-tenant SaaS. It does not automatically resolve exceptions or authorize payments. The primary PO/receipt relationship key is purchase-order number + item code. Where a supplier is supplied, receipt rows from a conflicting named supplier are excluded from quantity support, and a supplier conflict is surfaced for review. Missing or conflicting currency evidence across the invoice, matched PO, payment or credit records blocks amount-based recovery calculations. The product does not perform currency conversion, tax treatment, robust supplier master-data resolution, tolerance profiles, split/merged line matching, complete partial-payment accounting, or ERP integrations. Indicative flagged line value is not verified loss or recoverable amount. A line with no findings means only that the current configured rules did not trigger.

Supplier-statement-to-AP-ledger matching is **not yet implemented**. Its public page has been marked as a planned extension and removed from active navigation and the sitemap. Do not sell that workflow until its matching engine, evidence exports and tests are complete.

Agree scope, exclusions, data handling, acceptance criteria, timeline, fee and payment terms in writing before paid work starts.

## Supplier-payment recovery workflow

The original reconciliation workbench remains available with its sample loader, source-row evidence inspector, rule findings, review notes, report builder, print/PDF output, exception CSV export, evaluation brief builder and contact workflow. The additional **Supplier payment recovery investigation** section extends that product rather than replacing it.

The recovery section accepts six CSV sources:

- **Invoices:** `invoice_number,supplier,po_number,item_code,quantity,unit_price,line_amount,currency,invoice_date`
- **Purchase orders:** `po_number,supplier,item_code,quantity,unit_price,currency`
- **Goods receipts:** `receipt_number,po_number,supplier,item_code,quantity,receipt_date`
- **Payments:** `payment_id,invoice_number,supplier,paid_amount,currency,payment_date`
- **Credits:** `credit_note_number,invoice_number,supplier,credit_amount,currency,credit_date`
- **PO amendments:** `amendment_id,po_number,supplier,item_code,amended_quantity,amended_unit_price,effective_date` (use ISO `YYYY-MM-DD` effective dates; missing, non-ISO or conflicting amendments block amount-based calculations).

Load the illustrative recovery sample explicitly to test the additional workflow. It is synthetic and not a customer outcome. The recovery engine keeps source-row references, distinguishes invoice excess candidates from payment excess candidates, supports case review status and notes, and exports worklist CSV, case JSON, and an investigation package. Payment excess is explicitly a candidate, not a confirmed recovery. Invoice-excess and payment-excess totals are separate, potentially overlapping measures; do not add them together. Missing or conflicting currency evidence blocks amount-based calculations, and named supplier conflicts on receipt rows cannot support the invoice's received quantity, and payment/credit rows with conflicting supplier identities block payment or net-amount calculations. Case notes live only in the browser session until exported.

### Calculation and review boundary

Potential invoice excess is not the same as a paid overpayment. The payment-excess calculation requires invoice-linked payment records and still needs human verification. Invoice-level payment and credit totals may be allocated proportionally across lines when exact remittance allocation is unavailable. The workflow does not fully model taxes, freight, currency conversion, tolerance rules, retainage, all partial-payment allocations, complex split/merged lines or every credit-note scenario. The outcome tracker records reviewer-entered outcomes; it does not independently verify a bank receipt or supplier credit.

### Tests

With Node.js 20 or later:

```sh
node --check recovery-core.js
node tests/recovery-core.test.js
node tests/check-inline-scripts.js
node tests/site-readiness.test.js
node tests/inquiries.test.mjs
```

The regression suite covers quoted CSV parsing, price and payment-excess candidates, credits, supplier conflicts, source-row traceability, currency-conflict guards and multi-line payment allocation. The GitHub Actions workflow runs on pushes to `main` and pull requests targeting `main`. It checks recovery-engine syntax, runs the regression suite, parses all inline scripts, and asserts the primary reconciliation safety guards. Passing these checks is necessary but not a substitute for validation against a buyer's human-reviewed reference set.


## Commercial readiness

See [`PILOT-OFFER.md`](PILOT-OFFER.md) for the buyer-facing evaluation scope, deliverables, acceptance criteria, payment sequence, data handling and limitations. The website explains that the fee is negotiated privately and work begins only after written scope and payment arrangements are confirmed. The contact form can store inquiry metadata through the D1-backed Pages Function once the DB binding is configured; manual WhatsApp/email handoff remains the fallback. It is **not** a payment checkout and does not itself collect funds. A real transaction still requires both sides to agree a usable payment method and confirm payment before kickoff.
