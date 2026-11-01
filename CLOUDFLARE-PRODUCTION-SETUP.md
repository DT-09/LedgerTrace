# LedgerTrace Cloudflare Pages production setup

LedgerTrace remains a browser-side reconciliation workbench. This optional Pages Function stores **inquiry metadata only**. It does not accept CSV uploads or accounting documents.

## 1. Create and bind the inquiry database

1. In Cloudflare, create a D1 database named \`ledgertrace-inquiries\`.
2. Apply \`migrations/0001_create_inquiries.sql\` to that database.
3. Open the LedgerTrace Pages project settings.
4. Under **Settings → Functions → D1 database bindings**, add a binding named \`DB\` and select \`ledgertrace-inquiries\`.
5. Redeploy the Pages project after saving the binding.

The API route is \`POST /api/inquiries\`. Without the \`DB\` binding it returns a controlled 503 response and the website falls back to its manual WhatsApp/email handoff.
The `GET /api/inquiries` health response exposes only two non-secret booleans: `inboxConfigured` and `emailNotificationsConfigured`. Check these flags before accepting a real inquiry.

## 2. Optional email notification

The D1 table is the inquiry inbox. To receive an email alert when a record is saved, configure these Pages environment variables:

- \`RESEND_API_KEY\` — secret.
- \`RESEND_FROM_EMAIL\` — a verified sender address in Resend.
- \`LEAD_NOTIFICATION_EMAIL\` — the destination inbox.

Email notification is optional. A notification failure does not discard a successfully stored inquiry. Do not put API keys in GitHub source files.

## 3. Verify before enabling the form

- Submit a test inquiry using an address you control.
- Confirm the API returns HTTP 201 and a reference.
- Confirm the row appears in D1.
- If email notifications are configured, confirm the alert arrives.
- Submit an invalid email and confirm HTTP 400.
- Submit from a different origin and confirm HTTP 403.
- Submit more than five requests in one minute from one IP and confirm HTTP 429.
- Confirm the manual WhatsApp/email fallback still works when the DB binding is absent.

## Data and security boundary

- The form accepts contact and scope details only; it has no file-upload field.
- CSV files selected in the workbench remain in the browser and are not sent to this API.
- The function rejects cross-origin requests, limits payload size and field lengths, validates email, uses prepared SQL statements, applies a per-IP request limit using a SHA-256 hash, and supports a honeypot.
- Do not send confidential accounting records through the inquiry form, WhatsApp or ordinary email. Agree a secure transfer method before any buyer data is shared.
- Review D1 access permissions and define an operational retention/deletion process before accepting real buyer inquiries.

This setup does not create a payment checkout, legal contracting capability, security certification or ERP integration. Those remain separate operational decisions.
