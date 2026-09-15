-- =============================================================================
-- MIGRATION: 0001_core_tables
-- Description: Core business entity tables for Fluenciel Language Studio.
--              All tables have RLS enabled. Policies will be added in subsequent
--              migrations once auth hooks are wired up.
-- Depends on:  0000_initial_schema (enums, profiles, RBAC)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. COURSES
-- -----------------------------------------------------------------------------
CREATE TABLE courses (
  id                    UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  title                 TEXT          NOT NULL,
  slug                  TEXT          UNIQUE NOT NULL,
  level                 TEXT          NOT NULL,
  short_description     TEXT          NOT NULL,
  description           TEXT          NOT NULL,
  syllabus              JSONB         DEFAULT '[]'::jsonb,
  duration              TEXT          NOT NULL,
  mode                  TEXT          NOT NULL,
  batch_size            INTEGER       NOT NULL,
  start_date            DATE,
  fee                   INTEGER       NOT NULL,
  registration_fee      INTEGER       NOT NULL,
  installment_available BOOLEAN       DEFAULT false,
  material_included     BOOLEAN       DEFAULT true,
  mock_tests            INTEGER       DEFAULT 0,
  speaking_practice     BOOLEAN       DEFAULT true,
  brochure_url          TEXT,
  status                course_status DEFAULT 'draft',
  created_at            TIMESTAMPTZ   DEFAULT NOW(),
  updated_at            TIMESTAMPTZ   DEFAULT NOW()
);
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 2. TEACHERS
-- -----------------------------------------------------------------------------
CREATE TABLE teachers (
  id         UUID        REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  bio        TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 3. STUDENTS
-- -----------------------------------------------------------------------------
CREATE TABLE students (
  id         UUID           REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  teacher_id UUID           REFERENCES teachers(id),
  status     student_status DEFAULT 'LEAD',
  created_at TIMESTAMPTZ    DEFAULT NOW(),
  updated_at TIMESTAMPTZ    DEFAULT NOW()
);
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 4. LEADS
-- -----------------------------------------------------------------------------
CREATE TABLE leads (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  phone      TEXT,
  course_id  UUID        REFERENCES courses(id),
  status     lead_status DEFAULT 'NEW',
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 5. WEBHOOK EVENTS
-- -----------------------------------------------------------------------------
CREATE TABLE webhook_events (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  razorpay_event_id TEXT        UNIQUE NOT NULL,
  event_type        TEXT        NOT NULL,
  payload           JSONB       NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 6. PAYMENTS
-- -----------------------------------------------------------------------------
CREATE TABLE payments (
  id                UUID           DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id          TEXT           NOT NULL,
  payment_id        TEXT,
  student_id        UUID           REFERENCES students(id),
  course_id         UUID           REFERENCES courses(id),
  amount_paise      INTEGER        NOT NULL,
  currency          TEXT           DEFAULT 'INR',
  status            payment_status DEFAULT 'CREATED',
  method            TEXT,
  razorpay_event_id TEXT           REFERENCES webhook_events(razorpay_event_id),
  created_at        TIMESTAMPTZ    DEFAULT NOW(),
  updated_at        TIMESTAMPTZ    DEFAULT NOW()
);
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
