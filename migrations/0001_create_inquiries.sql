CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  invoice_volume TEXT NOT NULL DEFAULT '',
  cadence TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at
  ON inquiries (created_at DESC);

CREATE TABLE IF NOT EXISTS inquiry_rate_limits (
  ip_hash TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ip_hash, window_start)
);
