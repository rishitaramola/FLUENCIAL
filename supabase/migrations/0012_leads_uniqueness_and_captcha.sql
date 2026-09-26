-- MIGRATION: 0012_leads_uniqueness_and_captcha
-- Description: Enforce uniqueness on email and phone for the leads table.
-- =============================================================================

-- 1. Ensure existing emails are lowercased to prevent conflicts with the new index
UPDATE leads SET email = lower(email);

-- 2. Create case-insensitive unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS leads_unique_email_idx ON leads (lower(email));

-- 3. Create unique index on phone
CREATE UNIQUE INDEX IF NOT EXISTS leads_unique_phone_idx ON leads (phone) WHERE phone IS NOT NULL;
