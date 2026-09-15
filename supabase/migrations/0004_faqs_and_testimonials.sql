-- =============================================================================
-- MIGRATION: 0004_faqs_and_testimonials
-- Description: Dynamic FAQs and Student Success Stories tables with RLS
-- Depends on: 0000_initial_schema, 0001_core_tables, 0003_rls_and_permissions
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. FAQS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE faqs (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  question      TEXT        NOT NULL,
  answer        TEXT        NOT NULL,
  category      TEXT        DEFAULT 'General',
  display_order INTEGER     DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view FAQs" ON public.faqs;
CREATE POLICY "Anyone can view FAQs"
  ON public.faqs FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can manage FAQs" ON public.faqs;
CREATE POLICY "Admins can manage FAQs"
  ON public.faqs FOR ALL
  TO authenticated
  USING (public.authorize('courses:update'))
  WITH CHECK (public.authorize('courses:update'));

-- -----------------------------------------------------------------------------
-- 2. SUCCESS STORIES (TESTIMONIALS & VIDEO REVIEWS)
-- -----------------------------------------------------------------------------
CREATE TABLE success_stories (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name      TEXT        NOT NULL,
  course_name       TEXT        NOT NULL,
  score_achievement TEXT        NOT NULL,
  testimonial_text  TEXT        NOT NULL,
  video_url         TEXT,
  avatar_url        TEXT,
  is_featured       BOOLEAN     DEFAULT true,
  display_order     INTEGER     DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view success stories" ON public.success_stories;
CREATE POLICY "Anyone can view success stories"
  ON public.success_stories FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can manage success stories" ON public.success_stories;
CREATE POLICY "Admins can manage success stories"
  ON public.success_stories FOR ALL
  TO authenticated
  USING (public.authorize('courses:update'))
  WITH CHECK (public.authorize('courses:update'));

-- -----------------------------------------------------------------------------
-- 3. SEED INITIAL FAQS & SUCCESS STORIES
-- -----------------------------------------------------------------------------
INSERT INTO public.faqs (question, answer, category, display_order) VALUES
  ('What language levels do you teach?', 'We offer complete CEFR-aligned training for French and German from absolute beginner (A1) to advanced proficiency (C1/C2).', 'Courses', 1),
  ('Are the DELF / GOETHE certificates globally recognized?', 'Yes! DELF/DALF (French Ministry of Education) and Goethe-Zertifikat (Germany) are official, lifelong diplomas recognized by universities, employers, and immigration authorities worldwide.', 'Certifications', 2),
  ('How large are the class batches?', 'To guarantee maximum oral speaking practice, our live batches are strictly capped at 8 to 10 students.', 'Classes', 3),
  ('Can I pay in installments?', 'Yes, installment payment options are available for B1 and B2 diploma programs. Contact admissions for customized payment plans.', 'Payments', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.success_stories (student_name, course_name, score_achievement, testimonial_text, video_url, is_featured, display_order) VALUES
  ('Ananya Roy', 'French B1 Diploma', 'DELF B1 Score: 88.5/100', 'The live speaking labs and 1-on-1 mock tests gave me total confidence for the DELF examination in New Delhi!', 'https://www.youtube.com/embed/dQw4w9WgXcQ', true, 1),
  ('Siddharth Mehta', 'German A2 FastTrack', 'Goethe A2 Score: 92/100', 'Small batch sizes meant I spoke German in every single class. Highly recommended for study abroad aspirants.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', true, 2)
ON CONFLICT DO NOTHING;
