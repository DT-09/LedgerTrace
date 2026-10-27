# LedgerTrace

LedgerTrace is a browser-based accounts-payable reconciliation workbench. It compares invoice lines with purchase-order lines and goods-receipt quantities, explains rule-triggered exceptions, and exports a review worklist.

## Run it

Deploy this repository to Cloudflare Pages with the repository root as the project directory, no build command, and the output directory set to `/` (the root). The site is static HTML/CSS/JavaScript; no package install or build step is required. After Cloudflare finishes its deployment, use the `*.pages.dev` URL shown in your Pages project. You can also open `index.html` directly in a modern browser.

1. Load the included sample data or upload three CSV exports.
2. Use one row per document line.
3. Click **Run reconciliation**.
4. Filter/search findings and export the exception report.

## CSV inputs

The header names are normalized, so spaces, hyphens, and capitalization are tolerated. Recommended columns:

- **Invoices:** `invoice_number`, `supplier`, `po_number`, `item_code`, `quantity`, `unit_price`; optional `line_amount`, `invoice_date`, `currency`.
- **Purchase orders:** `po_number`, `supplier`, `item_code`, `quantity`, `unit_price`.
- **Goods receipts:** `receipt_number`, `po_number`, `item_code`, `quantity`, `receipt_date`.

Common aliases such as `invoice_no`, `vendor`, `sku`, `qty`, `price`, `purchase_order_number`, and `grn` are accepted. Quantities and unit prices must be numeric. Use consistent currency and units across all three files.

## Current checks

- Repeated invoice identifiers.
- Missing PO references and missing matching PO lines.
- Supplier mismatches between invoice and PO.
- Invoiced quantity above ordered quantity.
- Unit-price differences greater than 0.01 in the input currency.
- Invoice line amount inconsistent with quantity × unit price.
- Missing goods receipt and invoiced quantity above total received quantity.
- PO lines without invoice matches and goods receipts without PO matches.

## Important limitations

This is a **local-first pilot application**, not yet a production multi-tenant SaaS. Files are processed in the browser; there is no server upload, account, saved history, payment system, or recurring subscription. It does not automatically resolve exceptions or authorize payments.

The current matching key is purchase-order number + item code. It does not yet perform robust supplier master-data resolution, currency conversion, tax treatment, credit-note netting, tolerance profiles, split/merged line matching, partial-payment accounting, or ERP integrations. Exception value is an indicative sum of flagged invoice line amounts, not a verified loss or recoverable amount. A line with no findings means only that the current configured rules did not trigger.

Use synthetic or approved anonymized records for evaluation. Review all findings against source documents before taking accounting or payment action.

## Introductory paid evaluation

**US$150 fixed fee · one AP workflow · up to 500 combined CSV rows · five business days after clean inputs and written scope approval.** Deliverables: an exception CSV, concise findings report, comparison against a human-reviewed reference set, and a 30-minute review handoff.

This is a bounded evaluation service, not a subscription or production-software claim. It excludes ERP integrations, hosted data storage, payment actions, currency conversion, tax/credit-note treatment, robust split/merged line matching, and guaranteed detection. Use synthetic or client-approved anonymized data only. Confirm scope, exclusions, data handling, acceptance criteria, and payment terms in writing before work starts.

Do not assume product-market fit. Validate the workflow and findings with a real AP team before building authentication, cloud storage, integrations, or billing. These features create security, privacy, and operational obligations and should be built around a confirmed buyer workflow.