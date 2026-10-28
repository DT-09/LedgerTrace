# LedgerTrace Recovery

**Supplier-payment audit and recovery workbench for industrial distributors.**

LedgerTrace helps finance teams investigate possible supplier overcharges using invoice, purchase-order, goods-receipt, payment, credit-note and PO-amendment CSVs. It produces a source-row-linked worklist, a calculation basis, and a case record for human review and supplier resolution.

It separates three different things:

- **Potential invoice excess:** the supplied invoice amount exceeds the reconstructed net expected amount.
- **Payment excess candidate:** invoice-linked payments exceed the reconstructed net expected amount.
- **Verified recovery outcome:** a human-entered credit, refund, invoice correction or rejected claim with a supporting reference.

A calculated candidate is not proof of a loss, supplier liability or recovered cash.

## Try it

1. Open the deployed site or open `index.html` in a modern browser.
2. Select **Run realistic sample** to load illustrative records across invoices, POs, receipts, payments and a supplier credit.
3. Inspect the investigation worklist and select a case.
4. Review the calculation, findings and source row references.
5. Record a case status, corrective action, reviewer notes and outcome reference.
6. Export the worklist CSV, one case as JSON, or the investigation package JSON.

The built-in sample is synthetic and does not represent customer outcomes. Files are parsed in the browser. The page does not send selected CSV contents to a LedgerTrace backend. Case notes are held only in the current tab session and can be included in exports; clearing or closing the tab loses unexported work.

## CSV schemas

Use one row per document line and consistent identifiers/currency. Header aliases are supported for common terms such as `vendor`, `sku`, `qty`, `price`, `invoice_no`, `purchase_order_number` and `grn`.

| Source | Core columns |
|---|---|
| Invoices (required) | `invoice_number,supplier,po_number,item_code,quantity,unit_price,line_amount` |
| Purchase orders | `po_number,supplier,item_code,quantity,unit_price` |
| Goods receipts | `receipt_number,po_number,supplier,item_code,quantity` |
| Payments | `payment_id,invoice_number,supplier,paid_amount` |
| Credits | `credit_note_number,invoice_number,supplier,credit_amount` |
| PO amendments | `amendment_id,po_number,supplier,item_code,amended_quantity,amended_unit_price,effective_date` |

Optional fields include dates, currency and change-order references. The app uses invoice references and supplier names to associate payment and credit rows. Payment/credit totals linked to a multi-line invoice are allocated to lines in proportion to billed line value. That allocation is a practical estimate, not a substitute for remittance-level accounting.

## Current analysis

- Matches invoice lines to compatible PO/item records and aggregates matching receipt quantities.
- Applies a supplied PO amendment with an effective date on or before the invoice date.
- Estimates expected net line value using the quantity supported by both the PO and goods receipt and the selected PO unit price.
- Compares supplied invoice amounts, invoice-linked payment records and invoice-linked credits.
- Avoids quantification when supplier attribution or PO unit price is ambiguous.
- Preserves CSV source row references in the case inspector and exported records.
- Records review state and outcome details for the current browser session.

## Important limitations

This is a CSV-based investigation MVP, not a production accounting system or automated recovery service. It does not authenticate source documents or independently verify bank activity, supplier acceptance, issued credits or refunds. It does not fully model tax, freight, currency conversion, tolerance rules, retainage, complex split/merged lines, payment allocation by remittance advice, supplier master-data resolution, or every credit-note scenario. PO amendments require reviewer confirmation. The output is not an accounting journal, legal conclusion or supplier demand. Human review is required before taking action.

The app's browser-local processing claim applies to the selected CSV contents; the static page may still load external resources depending on deployment. Use synthetic or client-approved anonymized data for evaluation.

## Tests

With Node.js 20 or later:

```sh
node --check recovery-core.js
node tests/recovery-core.test.js
```

GitHub Actions runs these checks on pushes to `rebuild/**` and pull requests targeting `main`.

## Commercial evaluation

The proposed first paid engagement is a bounded, five-business-day supplier-payment review using an agreed reference set and a limited CSV sample. Before kickoff, agree the fee, allowed data, supported columns, test cases, acceptance criteria, exclusions and payment terms in writing. Deliverables should include the ranked worklist, source-linked evidence, human-reviewed false-positive/missed-case summary and a resolution tracker. Do not promise savings or recovery before reviewing a buyer's actual records and verifying outcomes.
