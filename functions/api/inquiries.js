const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  }
});

const clean = (value, max) => String(value ?? "").trim().slice(0, max);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function rateLimit(request, db) {
  const ip = request.headers.get("CF-Connecting-IP");
  if (!ip) return true;

  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  const hash = [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
  const windowStart = Math.floor(Date.now() / 60000);

  await db.prepare("DELETE FROM inquiry_rate_limits WHERE window_start < ?")
    .bind(windowStart - 1440).run();

  const result = await db.prepare(
    "INSERT INTO inquiry_rate_limits (ip_hash, window_start, request_count) VALUES (?, ?, 1) " +
    "ON CONFLICT(ip_hash, window_start) DO UPDATE SET request_count = request_count + 1 " +
    "RETURNING request_count"
  ).bind(hash, windowStart).first();

  return Number(result?.request_count ?? 0) <= 5;
}

export async function onRequestGet() {
  return json({ ok: true, service: "ledgertrace-inquiry-intake", submission: "POST" }, 200);
}

export async function onRequestPost({ request, env }) {
  const requestOrigin = new URL(request.url).origin;
  if (request.headers.get("Origin") !== requestOrigin) {
    return json({ ok: false, error: "Request origin could not be verified." }, 403);
  }

  if (!(request.headers.get("Content-Type") || "").toLowerCase().includes("application/json")) {
    return json({ ok: false, error: "Use the supported inquiry form." }, 415);
  }

  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (declaredLength > 8192) return json({ ok: false, error: "Inquiry is too large." }, 413);

  let payload;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > 8192) {
      return json({ ok: false, error: "Inquiry is too large." }, 413);
    }
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Inquiry payload is not valid JSON." }, 400);
  }

  // Honeypot: return a generic acceptance response without storing bot submissions.
  if (clean(payload.website, 200)) return json({ ok: true }, 202);

  const email = clean(payload.email, 254);
  const company = clean(payload.company, 160);
  const volume = clean(payload.volume, 80);
  const cadence = clean(payload.cadence, 100);
  const description = clean(payload.description, 2500);

  if (!emailPattern.test(email)) {
    return json({ ok: false, error: "Enter a valid work email address." }, 400);
  }
  if (description.length < 12) {
    return json({ ok: false, error: "Add a little more detail about the workflow to investigate." }, 400);
  }

  if (!env.DB) {
    return json({ ok: false, code: "INBOX_NOT_CONFIGURED", error: "The secure inquiry inbox is not connected yet." }, 503);
  }

  try {
    if (!(await rateLimit(request, env.DB))) {
      return json({ ok: false, error: "Too many inquiries from this connection. Try again later." }, 429);
    }

    const reference = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await env.DB.prepare(
      "INSERT INTO inquiries (id, email, company, invoice_volume, cadence, description, created_at, status) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, 'new')"
    ).bind(reference, email, company, volume, cadence, description, createdAt).run();

    let notification = "not_configured";
    if (env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.LEAD_NOTIFICATION_EMAIL) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + env.RESEND_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: env.RESEND_FROM_EMAIL,
            to: [env.LEAD_NOTIFICATION_EMAIL],
            subject: "New LedgerTrace inquiry · " + reference.slice(0, 8),
            text: [
              "A new LedgerTrace inquiry was saved.",
              "Reference: " + reference,
              "Email: " + email,
              "Company/team: " + (company || "Not provided"),
              "Monthly volume: " + (volume || "Not provided"),
              "Engagement: " + (cadence || "Not provided"),
              "",
              "Workflow description:",
              description,
              "",
              "No accounting files were attached."
            ].join("\n")
          })
        });
        notification = response.ok ? "sent" : "failed";
      } catch {
        notification = "failed";
      }
    }

    return json({ ok: true, reference, notification }, 201);
  } catch {
    return json({ ok: false, error: "The inquiry could not be stored. Use the manual contact option instead." }, 500);
  }
}
