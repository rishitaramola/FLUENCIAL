-- MIGRATION: 0010_brochure_fields
-- Description: Adds brochure-specific fields to the leads table to capture Date of Birth and Lead Source.
-- =============================================================================

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS dob DATE,
  ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'WEBSITE';
