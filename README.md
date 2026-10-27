# LedgerTrace

LedgerTrace is a browser-based accounts-payable reconciliation workbench. It compares invoice lines with purchase-order lines and goods-receipt quantities, explains rule-triggered exceptions, and exports a review worklist.

## Try the working sample

1. Open the site and select **Load sample & run analysis**.
2. Inspect duplicate invoice IDs, a unit-price difference, a receipt shortfall, an invoice quantity above the PO quantity, a missing PO reference, and a missing goods receipt.
3. Select any result to inspect compared values, triggered rules, and source CSV row references.
4. Export the exception CSV or use **Print / save evidence PDF** to open a print-ready report and choose **Save as PDF** in the browser's print dialog.

The sample is illustrative and does not represent customer results.

## Run it locally

Deploy this repository to Cloudflare Pages with the repository root as the project directory, no build command, and the output directory set to `/`. It is static HTML/CSS/JavaScript; no package install or build step is required. You can also open `index.html` directly in a modern browser.

## CSV inputs

Use one row per document line. Header names are normalized, so spaces, hyphens, and capitalization are tolerated.

- **Invoices:** `invoice_number`, `supplier`, `po_number`, `item_code`, `quantity`, `unit_price`; optional `line_amount`, `invoice_date`, `currency`.
- **Purchase orders:** `po_number`, `supplier`, `item_code`, `quantity`, `unit_price`; optional `currency`.
- **Goods receipts:** `receipt_number`, `po_number`, `item_code`, `quantity`, `receipt_date`.

Common aliases such as `invoice_no`, `vendor`, `sku`, `qty`, `price`, `purchase_order_number`, and `grn` are accepted. Quantities and unit prices must be numeric. Invoice and PO currency codes must agree; when omitted, the app assumes USD. The app rejects mixed invoice/PO currencies rather than displaying a misleading combined total. Use consistent units across all three files.

## Current checks

- Potential duplicate invoice-line signatures (invoice ID, supplier, PO/item, quantity, unit price and line amount); repeated invoice IDs across distinct line items are not automatically treated as duplicates.
- Missing PO references and missing matching PO lines.
- Supplier mismatches between invoice and PO.
- Combined invoiced quantity above combined ordered quantity for the same PO/item matching key.
- Unit-price differences greater than 0.01 in the input currency.
- Invoice line amount inconsistent with quantity × unit price.
- Missing goods receipt and combined invoiced quantity above total received quantity for the same PO/item matching key.
- Multiple PO rows sharing a matching key are surfaced for review; mixed PO unit prices are not silently resolved.
- PO lines without invoice matches and goods receipts without PO matches.

## Data handling

The current app reads selected CSV files through browser file APIs and processes them in the browser tab. The app code does not upload those CSV contents to a LedgerTrace server. Review notes are held in page memory for the current session. The page loads web fonts from Google, so this is not a claim that the browser makes no network requests. For initial evaluation, use synthetic or client-approved anonymized records.

## Paid evaluation

**Five business days · one AP workflow · up to 500 combined CSV rows · fixed fee quoted in writing before kickoff.** The five-business-day period starts after clean input files and written scope approval.

Deliverables: an exception CSV, concise findings report, comparison against an agreed human-reviewed reference set, false-positive and missed-case summary, and a 30-minute review handoff. Acceptance criteria are agreed before work starts: agreed test cases are processed; findings include the rule and source-row references where available; and the report records observed misses and false positives against the reference set.

This is a bounded evaluation service, not a production multi-tenant SaaS. It does not automatically resolve exceptions or authorize payments. The current matching key is purchase-order number + item code. It does not yet perform robust supplier master-data resolution, currency conversion, tax treatment, credit-note netting, tolerance profiles, split/merged line matching, partial-payment accounting, or ERP integrations. Indicative flagged line value is not verified loss or recoverable amount. A line with no findings means only that the current configured rules did not trigger.

Confirm scope, exclusions, data handling, acceptance criteria, and payment terms in writing before work starts.
