-- =============================================================================
-- MIGRATION: 0005_master_schema_enhancements
-- Description: Establishes Batches, Enrollments, Demo Bookings, Trainers,
--              Attendance, Progress, and Brochures tables with RLS.
-- =============================================================================

-- 1. BATCHES (LIVE COHORTS)
CREATE TABLE batches (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id      UUID        REFERENCES courses(id) ON DELETE CASCADE,
  batch_name     TEXT        NOT NULL,
  start_date     DATE        NOT NULL,
  end_date       DATE,
  schedule_text  TEXT        NOT NULL, -- e.g. "Mon / Wed 4:00 PM - 5:30 PM"
  capacity       INTEGER     NOT NULL DEFAULT 10,
  enrolled_count INTEGER     NOT NULL DEFAULT 0,
  teacher_id     UUID        REFERENCES teachers(id),
  status         TEXT        NOT NULL DEFAULT 'UPCOMING', -- UPCOMING, ONGOING, COMPLETED
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active batches" ON public.batches;
CREATE POLICY "Anyone can view active batches"
  ON public.batches FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins can manage batches" ON public.batches;
CREATE POLICY "Admins can manage batches"
  ON public.batches FOR ALL TO authenticated
  USING (public.authorize('courses:update'))
  WITH CHECK (public.authorize('courses:update'));

-- 2. ENROLLMENTS
CREATE TABLE enrollments (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id      UUID        REFERENCES students(id) ON DELETE CASCADE,
  course_id       UUID        REFERENCES courses(id) ON DELETE CASCADE,
  batch_id        UUID        REFERENCES batches(id),
  teacher_id      UUID        REFERENCES teachers(id),
  amount_paid     INTEGER     NOT NULL DEFAULT 0,
  balance         INTEGER     NOT NULL DEFAULT 0,
  status          TEXT        NOT NULL DEFAULT 'ACTIVE', -- PENDING, ACTIVE, PAUSED, COMPLETED
  enrollment_date DATE        DEFAULT CURRENT_DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students view own enrollments" ON public.enrollments;
CREATE POLICY "Students view own enrollments"
  ON public.enrollments FOR SELECT TO authenticated
  USING (
    student_id = auth.uid()
    OR teacher_id = auth.uid()
    OR public.authorize('students:read')
  );

DROP POLICY IF EXISTS "Admins manage enrollments" ON public.enrollments;
CREATE POLICY "Admins manage enrollments"
  ON public.enrollments FOR ALL TO authenticated
  USING (public.authorize('students:update'))
  WITH CHECK (public.authorize('students:update'));

-- 3. DEMO BOOKINGS
CREATE TABLE demo_bookings (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name      TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  phone          TEXT,
  current_level  TEXT        DEFAULT 'Beginner (A1)',
  purpose        TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  status         TEXT        DEFAULT 'PENDING', -- PENDING, CONFIRMED, COMPLETED, CANCELLED
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE demo_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can request demo" ON public.demo_bookings;
CREATE POLICY "Public can request demo"
  ON public.demo_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins manage demo bookings" ON public.demo_bookings;
CREATE POLICY "Admins manage demo bookings"
  ON public.demo_bookings FOR ALL TO authenticated
  USING (public.authorize('leads:read'))
  WITH CHECK (public.authorize('leads:update'));

-- 4. TRAINERS (FACULTY SHOWCASE)
CREATE TABLE trainers (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT        NOT NULL,
  role           TEXT        NOT NULL,
  bio            TEXT        NOT NULL,
  qualifications TEXT        NOT NULL,
  specialization TEXT        NOT NULL,
  languages      TEXT        NOT NULL DEFAULT 'French, English',
  avatar_url     TEXT,
  is_featured    BOOLEAN     DEFAULT true,
  is_published   BOOLEAN     DEFAULT true,
  display_order  INTEGER     DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published trainers" ON public.trainers;
CREATE POLICY "Anyone can view published trainers"
  ON public.trainers FOR SELECT TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "Admins manage trainers" ON public.trainers;
CREATE POLICY "Admins manage trainers"
  ON public.trainers FOR ALL TO authenticated
  USING (public.authorize('teachers:update'))
  WITH CHECK (public.authorize('teachers:update'));

-- 5. ATTENDANCE
CREATE TABLE attendance (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID        REFERENCES students(id) ON DELETE CASCADE,
  batch_id   UUID        REFERENCES batches(id) ON DELETE CASCADE,
  date       DATE        NOT NULL DEFAULT CURRENT_DATE,
  status     attendance_status NOT NULL DEFAULT 'PRESENT',
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Teachers and students view attendance" ON public.attendance;
CREATE POLICY "Teachers and students view attendance"
  ON public.attendance FOR SELECT TO authenticated
  USING (
    student_id = auth.uid()
    OR public.authorize('students:read')
  );

DROP POLICY IF EXISTS "Teachers and admins manage attendance" ON public.attendance;
CREATE POLICY "Teachers and admins manage attendance"
  ON public.attendance FOR ALL TO authenticated
  USING (public.authorize('teachers:read') OR public.authorize('students:update'))
  WITH CHECK (public.authorize('teachers:read') OR public.authorize('students:update'));

-- 6. PROGRESS (CEFR EVALUATIONS)
CREATE TABLE progress (
  id                 UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id         UUID        REFERENCES students(id) ON DELETE CASCADE,
  course_id          UUID        REFERENCES courses(id),
  speaking_score     INTEGER     DEFAULT 0,
  listening_score    INTEGER     DEFAULT 0,
  reading_score      INTEGER     DEFAULT 0,
  writing_score      INTEGER     DEFAULT 0,
  grammar_score      INTEGER     DEFAULT 0,
  vocabulary_score   INTEGER     DEFAULT 0,
  mock_exam_score    INTEGER     DEFAULT 0,
  evaluated_by       UUID        REFERENCES teachers(id),
  evaluated_at       TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students view own progress" ON public.progress;
CREATE POLICY "Students view own progress"
  ON public.progress FOR SELECT TO authenticated
  USING (
    student_id = auth.uid()
    OR evaluated_by = auth.uid()
    OR public.authorize('students:read')
  );

DROP POLICY IF EXISTS "Teachers manage progress" ON public.progress;
CREATE POLICY "Teachers manage progress"
  ON public.progress FOR ALL TO authenticated
  USING (evaluated_by = auth.uid() OR public.authorize('students:update'))
  WITH CHECK (evaluated_by = auth.uid() OR public.authorize('students:update'));

-- 7. BROCHURES
CREATE TABLE brochures (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT        NOT NULL,
  course_id  UUID        REFERENCES courses(id) ON DELETE CASCADE,
  file_url   TEXT        NOT NULL,
  is_active  BOOLEAN     DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE brochures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active brochures" ON public.brochures;
CREATE POLICY "Anyone can view active brochures"
  ON public.brochures FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Admins manage brochures" ON public.brochures;
CREATE POLICY "Admins manage brochures"
  ON public.brochures FOR ALL TO authenticated
  USING (public.authorize('courses:update'))
  WITH CHECK (public.authorize('courses:update'));
