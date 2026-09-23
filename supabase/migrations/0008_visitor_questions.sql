-- =============================================================================
-- MIGRATION: 0008_visitor_questions
-- Description: Table for visitor-submitted questions and admin answers
-- =============================================================================

CREATE TABLE IF NOT EXISTS visitor_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  question TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  admin_answer TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE visitor_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert visitor questions" ON visitor_questions;
CREATE POLICY "Anyone can insert visitor questions"
  ON visitor_questions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage visitor questions" ON visitor_questions;
CREATE POLICY "Admins can manage visitor questions"
  ON visitor_questions FOR ALL
  TO authenticated
  USING (public.authorize('courses:update'))
  WITH CHECK (public.authorize('courses:update'));
