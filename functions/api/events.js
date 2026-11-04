const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  }
});

const allowedEvents = new Set([
  "page_view",
  "free_tool_sample_loaded",
  "free_tool_run_clicked",
  "recovery_tool_run_clicked",
  "source_file_selected",
  "exception_csv_exported",
  "evidence_report_printed",
  "recovery_case_exported",
  "recovery_worklist_exported",
  "evaluation_section_opened",
  "evaluation_request_opened",
  "checklist_opened",
  "inquiry_attempted",
  "inquiry_stored",
  "inquiry_fallback",
  "inquiry_failed",
  "buyer_economics_calculated"
]);

const cleanToken = (value, max = 80) => {
  const token = String(value ?? "").trim().slice(0, max);
  return /^[A-Za-z0-9._-]*$/.test(token) ? token : "";
};

export async function onRequestGet({ env }) {
  return json({
    ok: true,
    service: "ledgertrace-event-intake",
    configured: Boolean(env?.DB),
    retentionDays: 90
  });
}

export async function onRequestPost({ request, env }) {
  const requestOrigin = new URL(request.url).origin;
  if (request.headers.get("Origin") !== requestOrigin) {
    return json({ ok: false, error: "Request origin could not be verified." }, 403);
  }

  if (!(request.headers.get("Content-Type") || "").toLowerCase().includes("application/json")) {
    return json({ ok: false, error: "Use the supported event endpoint." }, 415);
  }

  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (declaredLength > 2048) return json({ ok: false, error: "Event payload is too large." }, 413);

  let payload;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > 2048) {
      return json({ ok: false, error: "Event payload is too large." }, 413);
    }
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Event payload is not valid JSON." }, 400);
  }

  const eventName = cleanToken(payload.event, 48);
  if (!allowedEvents.has(eventName)) {
    return json({ ok: false, error: "Event type is not supported." }, 400);
  }

  const pagePath = String(payload.path ?? "/").trim().slice(0, 160);
  if (!/^\/[A-Za-z0-9._/-]*$/.test(pagePath)) {
    return json({ ok: false, error: "Page path is not valid." }, 400);
  }

  const referrerHost = cleanToken(payload.referrerHost, 180);
  const utmSource = cleanToken(payload.utmSource);
  const utmMedium = cleanToken(payload.utmMedium);
  const utmCampaign = cleanToken(payload.utmCampaign);

  if (!env?.DB) {
    return json({ ok: false, code: "ANALYTICS_NOT_CONFIGURED" }, 503);
  }

  try {
    await env.DB.prepare(
      "DELETE FROM analytics_events WHERE created_at < datetime('now', '-90 days')"
    ).run();

    await env.DB.prepare(
      "INSERT INTO analytics_events (id, event_name, page_path, referrer_host, utm_source, utm_medium, utm_campaign, created_at) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      crypto.randomUUID(),
      eventName,
      pagePath,
      referrerHost,
      utmSource,
      utmMedium,
      utmCampaign,
      new Date().toISOString()
    ).run();

    return json({ ok: true }, 202);
  } catch {
    return json({ ok: false, error: "The event could not be recorded." }, 500);
  }
}
