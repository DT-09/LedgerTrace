CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referrer_host TEXT NOT NULL DEFAULT '',
  utm_source TEXT NOT NULL DEFAULT '',
  utm_medium TEXT NOT NULL DEFAULT '',
  utm_campaign TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at
  ON analytics_events (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name_created_at
  ON analytics_events (event_name, created_at DESC);
