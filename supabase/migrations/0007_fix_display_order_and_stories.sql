-- =============================================================================
-- MIGRATION: 0007_fix_display_order_and_stories
-- Description: Ensure courses.display_order column exists (fixes blocking error
--              where migration 0006 was not applied), and enhance success_stories
--              table for the new carousel/video feature.
-- Depends on:  0004 (success_stories base), 0006 (courses enhancements)
-- Safe:        All operations use IF NOT EXISTS / IF EXISTS guards.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. COURSES — ensure display_order and other 0006 columns exist
--    This is a safety net in case migration 0006 was not fully applied.
-- -----------------------------------------------------------------------------
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'French',
  ADD COLUMN IF NOT EXISTS class_frequency TEXT,
  ADD COLUMN IF NOT EXISTS session_duration TEXT,
  ADD COLUMN IF NOT EXISTS target_audience TEXT,
  ADD COLUMN IF NOT EXISTS prerequisites TEXT,
  ADD COLUMN IF NOT EXISTS learning_outcomes JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS skills JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS exam_preparation TEXT,
  ADD COLUMN IF NOT EXISTS study_material TEXT,
  ADD COLUMN IF NOT EXISTS demo_available BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Make fee columns nullable if they aren't already
DO $$
BEGIN
  ALTER TABLE courses ALTER COLUMN fee DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER TABLE courses ALTER COLUMN registration_fee DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS courses_status_featured_idx ON courses (status, is_featured, display_order);
CREATE INDEX IF NOT EXISTS courses_level_idx ON courses (level);

-- Set sensible default display_order for existing rows that have NULL
UPDATE courses SET display_order = 0 WHERE display_order IS NULL;

-- -----------------------------------------------------------------------------
-- 2. FAQS — ensure is_published column exists
-- -----------------------------------------------------------------------------
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;

-- -----------------------------------------------------------------------------
-- 3. SUCCESS_STORIES — enhance for video carousel feature
--    Base table was created in 0004. Add new columns for the carousel system.
-- -----------------------------------------------------------------------------
ALTER TABLE success_stories
  ADD COLUMN IF NOT EXISTS level TEXT,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'French',
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS title TEXT;

-- Ensure existing published stories stay published
UPDATE success_stories SET is_published = true WHERE is_featured = true AND is_published IS NULL;

-- RLS policies for success_stories (safe: check if they already exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'success_stories' AND policyname = 'Anyone can view published success stories'
  ) THEN
    CREATE POLICY "Anyone can view published success stories"
      ON public.success_stories FOR SELECT
      TO anon, authenticated
      USING (is_published = true);
  END IF;
END $$;
