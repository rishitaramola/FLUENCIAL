-- =============================================================================
-- MIGRATION: 0006_academy_platform
-- Description: Course completeness, site settings, student notes, lead fields,
--              publish flags, tighter teacher RLS, FAQ content cleanup.
-- Depends on:  0000–0005
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. COURSES — additional public catalogue fields
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

ALTER TABLE courses ALTER COLUMN fee DROP NOT NULL;
ALTER TABLE courses ALTER COLUMN registration_fee DROP NOT NULL;

CREATE INDEX IF NOT EXISTS courses_status_featured_idx ON courses (status, is_featured, display_order);
CREATE INDEX IF NOT EXISTS courses_level_idx ON courses (level);

-- -----------------------------------------------------------------------------
-- 2. FAQS
-- -----------------------------------------------------------------------------
ALTER TABLE faqs
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;

UPDATE faqs SET is_published = false WHERE is_published IS DISTINCT FROM true;

-- Replace fabricated seed copy with honest, educational FAQ content.
DELETE FROM faqs WHERE question IN (
  'What language levels do you teach?',
  'Are the DELF / GOETHE certificates globally recognized?',
  'How large are the class batches?',
  'Can I pay in installments?'
);

INSERT INTO faqs (question, answer, category, display_order, is_published) VALUES
  (
    'What does Fluenciel currently offer?',
    'Fluenciel Language Studio focuses on French language education. Published courses, levels, and class formats are listed on the Courses and Fees pages. If a level is marked Coming Soon, it is not yet open for enrolment.',
    'General',
    1,
    true
  ),
  (
    'What is the CEFR?',
    'The Common European Framework of Reference for Languages (CEFR) describes language ability from A1 (beginner) to C2 (mastery). Fluenciel uses CEFR levels to help you choose a suitable starting point. Completing a Fluenciel course is not the same as receiving an official exam diploma.',
    'CEFR',
    2,
    true
  ),
  (
    'What are DELF and TCF?',
    'DELF and TCF are official French-language exams administered by recognised testing bodies. Fluenciel may offer exam-oriented practice where listed on a course page. We do not issue official certificates and do not guarantee exam results.',
    'DELF',
    3,
    true
  ),
  (
    'How do I book a demo or send an enquiry?',
    'Use the Book a Free Demo form on the Contact page. Share your current level, goal, and preferred timing so the academy can respond with current options.',
    'Classes',
    4,
    true
  ),
  (
    'Where can I see course fees?',
    'Fees are shown on the Fees page and on each published course only when they have been set in the academy records. If a fee is not listed, contact Fluenciel for current details.',
    'Fees',
    5,
    true
  ),
  (
    'How do payments work?',
    'When online payment is enabled for a course, checkout is processed through Razorpay. Payment confirmation is recorded after server-side verification. Refunds follow the Refund Policy.',
    'Payments',
    6,
    true
  ),
  (
    'Do you offer online classes?',
    'Class mode (online, in-person, or hybrid) is listed on each published course. If a mode is not shown, ask via the enquiry form for current availability.',
    'Online Learning',
    7,
    true
  )
ON CONFLICT DO NOTHING;

-- -----------------------------------------------------------------------------
-- 3. SUCCESS STORIES
-- -----------------------------------------------------------------------------
ALTER TABLE success_stories
  ADD COLUMN IF NOT EXISTS level TEXT,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;

UPDATE success_stories SET is_published = false;
UPDATE success_stories SET is_published = false WHERE video_url ILIKE '%dQw4w9WgXcQ%';

-- -----------------------------------------------------------------------------
-- 4. LEADS — enquiry completeness
-- -----------------------------------------------------------------------------
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS current_level TEXT,
  ADD COLUMN IF NOT EXISTS goal TEXT,
  ADD COLUMN IF NOT EXISTS preferred_timing TEXT,
  ADD COLUMN IF NOT EXISTS preferred_mode TEXT,
  ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES profiles(id);

CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);

-- -----------------------------------------------------------------------------
-- 5. SITE SETTINGS (singleton)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  id                INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  academy_name      TEXT NOT NULL DEFAULT 'Fluenciel Language Studio',
  short_name        TEXT NOT NULL DEFAULT 'Fluenciel',
  tagline           TEXT,
  email             TEXT,
  phone             TEXT,
  whatsapp          TEXT,
  address           TEXT,
  working_hours     TEXT,
  instagram_url     TEXT,
  facebook_url      TEXT,
  youtube_url       TEXT,
  linkedin_url      TEXT,
  about_story       TEXT,
  mission           TEXT,
  philosophy        TEXT,
  methodology       TEXT,
  learning_environment TEXT,
  future_vision     TEXT,
  announcement      TEXT,
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

INSERT INTO site_settings (id, academy_name, short_name, tagline)
VALUES (
  1,
  'Fluenciel Language Studio',
  'Fluenciel',
  'Structured French learning for communication, study, work, and travel.'
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;
CREATE POLICY "Anyone can read site settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (public.authorize('profiles:update'))
  WITH CHECK (public.authorize('profiles:update'));

-- -----------------------------------------------------------------------------
-- 6. STUDENT NOTES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS student_notes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id  UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  teacher_id  UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE student_notes ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS student_notes_student_idx ON student_notes (student_id, created_at DESC);

DROP POLICY IF EXISTS "Assigned teachers and students read notes" ON public.student_notes;
CREATE POLICY "Assigned teachers and students read notes"
  ON public.student_notes FOR SELECT
  TO authenticated
  USING (
    student_id = auth.uid()
    OR teacher_id = auth.uid()
    OR public.authorize('students:read')
  );

DROP POLICY IF EXISTS "Assigned teachers insert notes" ON public.student_notes;
CREATE POLICY "Assigned teachers insert notes"
  ON public.student_notes FOR INSERT
  TO authenticated
  WITH CHECK (
    public.authorize('students:update')
    OR (
      teacher_id = auth.uid()
      AND EXISTS (
        SELECT 1 FROM public.students s
        WHERE s.id = student_id AND s.teacher_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS "Admins manage student notes" ON public.student_notes;
CREATE POLICY "Admins manage student notes"
  ON public.student_notes FOR ALL
  TO authenticated
  USING (public.authorize('students:update'))
  WITH CHECK (public.authorize('students:update'));

-- -----------------------------------------------------------------------------
-- 7. FAQ / STORY admin policies
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can view published faqs" ON public.faqs;
CREATE POLICY "Anyone can view published faqs"
  ON public.faqs FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.authorize('courses:read'));

DROP POLICY IF EXISTS "Admins manage faqs" ON public.faqs;
CREATE POLICY "Admins manage faqs"
  ON public.faqs FOR ALL
  TO authenticated
  USING (public.authorize('courses:update'))
  WITH CHECK (public.authorize('courses:update'));

DROP POLICY IF EXISTS "Anyone can view published stories" ON public.success_stories;
CREATE POLICY "Anyone can view published stories"
  ON public.success_stories FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.authorize('courses:read'));

DROP POLICY IF EXISTS "Admins manage success stories" ON public.success_stories;
CREATE POLICY "Admins manage success stories"
  ON public.success_stories FOR ALL
  TO authenticated
  USING (public.authorize('courses:update'))
  WITH CHECK (public.authorize('courses:update'));

-- -----------------------------------------------------------------------------
-- 8. Tighter teacher policies for attendance & progress
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Teachers and admins manage attendance" ON public.attendance;
CREATE POLICY "Teachers manage assigned attendance"
  ON public.attendance FOR INSERT
  TO authenticated
  WITH CHECK (
    public.authorize('students:update')
    OR EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = student_id AND s.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Teachers update assigned attendance"
  ON public.attendance FOR UPDATE
  TO authenticated
  USING (
    public.authorize('students:update')
    OR EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = student_id AND s.teacher_id = auth.uid()
    )
  )
  WITH CHECK (
    public.authorize('students:update')
    OR EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = student_id AND s.teacher_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Teachers manage progress" ON public.progress;
CREATE POLICY "Teachers manage assigned progress"
  ON public.progress FOR INSERT
  TO authenticated
  WITH CHECK (
    public.authorize('students:update')
    OR (
      evaluated_by = auth.uid()
      AND EXISTS (
        SELECT 1 FROM public.students s
        WHERE s.id = student_id AND s.teacher_id = auth.uid()
      )
    )
  );

CREATE POLICY "Teachers update assigned progress"
  ON public.progress FOR UPDATE
  TO authenticated
  USING (
    public.authorize('students:update')
    OR (
      evaluated_by = auth.uid()
      AND EXISTS (
        SELECT 1 FROM public.students s
        WHERE s.id = student_id AND s.teacher_id = auth.uid()
      )
    )
  )
  WITH CHECK (
    public.authorize('students:update')
    OR evaluated_by = auth.uid()
  );

-- Teachers cannot update arbitrary user roles
-- (already restricted via user_roles:update = ADMIN only)

-- Payments: only service role / admin should insert; public checkout uses service role.
DROP POLICY IF EXISTS "Service inserts payments via authenticated admin" ON public.payments;

-- Allow authenticated students to see only own payments (already exists).
-- Webhook/order creation uses the service-role client and bypasses RLS.
