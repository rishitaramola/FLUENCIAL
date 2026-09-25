-- MIGRATION: 0011_brochure_otps
-- Description: Table for storing temporary email OTPs for brochure downloads.
-- =============================================================================

CREATE TABLE IF NOT EXISTS brochure_otps (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT        NOT NULL,
  otp_hash    TEXT        NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  attempts    INTEGER     DEFAULT 0,
  verified_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE brochure_otps ENABLE ROW LEVEL SECURITY;

-- No public access. Only service roles / server-side can access this.
-- We do not create any SELECT/INSERT policies for anon/authenticated roles.
