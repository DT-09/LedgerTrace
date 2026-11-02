(() => {
  const allowedEvents = {
    sampleBtn: "free_tool_sample_loaded",
    heroSampleBtn: "free_tool_sample_loaded",
    runBtn: "free_tool_run_clicked",
    recRunBtn: "recovery_tool_run_clicked",
    exportBtn: "exception_csv_exported",
    reportExport: "exception_csv_exported",
    evidencePdfBtn: "evidence_report_printed",
    recExportCase: "recovery_case_exported",
    recExportAll: "recovery_worklist_exported",
    requestQuickCheck: "evaluation_request_opened",
    contactFromBuilder: "evaluation_request_opened",
    footerContact: "evaluation_request_opened"
  };

  const params = new URLSearchParams(location.search);
  const token = value => /^[A-Za-z0-9._-]{1,80}$/.test(value || "") ? value : "";
  let referrerHost = "";
  try { referrerHost = document.referrer ? new URL(document.referrer).hostname : ""; } catch {}

  function track(eventName) {
    const payload = {
      event: eventName,
      path: location.pathname,
      referrerHost: referrerHost.slice(0, 180),
      utmSource: token(params.get("utm_source")),
      utmMedium: token(params.get("utm_medium")),
      utmCampaign: token(params.get("utm_campaign"))
    };
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {});
  }

  document.addEventListener("click", event => {
    const target = event.target.closest("a,button");
    if (!target) return;
    const identified = target.closest("[id]");
    if (identified && allowedEvents[identified.id]) {
      track(allowedEvents[identified.id]);
      return;
    }
    const href = target.getAttribute("href") || "";
    if (href === "#evaluation" || href.endsWith("/#evaluation")) track("evaluation_section_opened");
    else if (href.includes("invoice-reconciliation-checklist")) track("checklist_opened");
  });

  document.addEventListener("change", event => {
    if (event.target.matches('input[type="file"]')) track("source_file_selected");
  });

  document.addEventListener("submit", event => {
    if (event.target && event.target.id === "contactForm") track("inquiry_attempted");
  });

  track("page_view");
})();
