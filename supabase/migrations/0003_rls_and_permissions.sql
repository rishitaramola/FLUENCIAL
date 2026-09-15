-- =============================================================================
-- MIGRATION: 0003_rls_and_permissions
-- Description: Seed role_permissions table and enable comprehensive RLS policies
--              for all tables (profiles, user_roles, role_permissions, courses,
--              teachers, students, leads, webhook_events, payments).
-- Depends on:  0000_initial_schema, 0001_core_tables, 0002_auth_trigger
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. SEED ROLE PERMISSIONS
-- -----------------------------------------------------------------------------
INSERT INTO public.role_permissions (role, permission) VALUES
  -- Admin permissions (full access)
  ('ADMIN', 'courses:create'),
  ('ADMIN', 'courses:read'),
  ('ADMIN', 'courses:update'),
  ('ADMIN', 'courses:delete'),
  ('ADMIN', 'teachers:create'),
  ('ADMIN', 'teachers:read'),
  ('ADMIN', 'teachers:update'),
  ('ADMIN', 'teachers:delete'),
  ('ADMIN', 'students:create'),
  ('ADMIN', 'students:read'),
  ('ADMIN', 'students:update'),
  ('ADMIN', 'students:delete'),
  ('ADMIN', 'leads:create'),
  ('ADMIN', 'leads:read'),
  ('ADMIN', 'leads:update'),
  ('ADMIN', 'leads:delete'),
  ('ADMIN', 'payments:create'),
  ('ADMIN', 'payments:read'),
  ('ADMIN', 'payments:update'),
  ('ADMIN', 'payments:delete'),
  ('ADMIN', 'profiles:read'),
  ('ADMIN', 'profiles:update'),
  ('ADMIN', 'profiles:delete'),
  ('ADMIN', 'user_roles:read'),
  ('ADMIN', 'user_roles:update'),

  -- Teacher permissions
  ('TEACHER', 'courses:read'),
  ('TEACHER', 'teachers:read'),
  ('TEACHER', 'students:read'),
  ('TEACHER', 'profiles:read'),

  -- Student permissions
  ('STUDENT', 'courses:read'),
  ('STUDENT', 'payments:read'),
  ('STUDENT', 'profiles:read')
ON CONFLICT (role, permission) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 2. POLICIES: PROFILES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.authorize('profiles:read'));

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid() OR public.authorize('profiles:update'))
  WITH CHECK (id = auth.uid() OR public.authorize('profiles:update'));

-- -----------------------------------------------------------------------------
-- 3. POLICIES: USER_ROLES & ROLE_PERMISSIONS
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.authorize('user_roles:read'));

DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
CREATE POLICY "Admins can manage user roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.authorize('user_roles:update'))
  WITH CHECK (public.authorize('user_roles:update'));

DROP POLICY IF EXISTS "Authenticated users can read role permissions" ON public.role_permissions;
CREATE POLICY "Authenticated users can read role permissions"
  ON public.role_permissions FOR SELECT
  TO authenticated
  USING (true);

-- -----------------------------------------------------------------------------
-- 4. POLICIES: COURSES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;
CREATE POLICY "Anyone can view published courses"
  ON public.courses FOR SELECT
  TO anon, authenticated
  USING (status = 'published' OR public.authorize('courses:read'));

DROP POLICY IF EXISTS "Admins can insert courses" ON public.courses;
CREATE POLICY "Admins can insert courses"
  ON public.courses FOR INSERT
  TO authenticated
  WITH CHECK (public.authorize('courses:create'));

DROP POLICY IF EXISTS "Admins can update courses" ON public.courses;
CREATE POLICY "Admins can update courses"
  ON public.courses FOR UPDATE
  TO authenticated
  USING (public.authorize('courses:update'))
  WITH CHECK (public.authorize('courses:update'));

DROP POLICY IF EXISTS "Admins can delete courses" ON public.courses;
CREATE POLICY "Admins can delete courses"
  ON public.courses FOR DELETE
  TO authenticated
  USING (public.authorize('courses:delete'));

-- -----------------------------------------------------------------------------
-- 5. POLICIES: TEACHERS
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated users can view teachers" ON public.teachers;
CREATE POLICY "Authenticated users can view teachers"
  ON public.teachers FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Teachers can update own bio" ON public.teachers;
CREATE POLICY "Teachers can update own bio"
  ON public.teachers FOR UPDATE
  TO authenticated
  USING (id = auth.uid() OR public.authorize('teachers:update'))
  WITH CHECK (id = auth.uid() OR public.authorize('teachers:update'));

DROP POLICY IF EXISTS "Admins can insert teachers" ON public.teachers;
CREATE POLICY "Admins can insert teachers"
  ON public.teachers FOR INSERT
  TO authenticated
  WITH CHECK (public.authorize('teachers:create'));

DROP POLICY IF EXISTS "Admins can delete teachers" ON public.teachers;
CREATE POLICY "Admins can delete teachers"
  ON public.teachers FOR DELETE
  TO authenticated
  USING (public.authorize('teachers:delete'));

-- -----------------------------------------------------------------------------
-- 6. POLICIES: STUDENTS
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Students can view own profile" ON public.students;
CREATE POLICY "Students can view own profile"
  ON public.students FOR SELECT
  TO authenticated
  USING (
    id = auth.uid()
    OR teacher_id = auth.uid()
    OR public.authorize('students:read')
  );

DROP POLICY IF EXISTS "Admins can manage students" ON public.students;
CREATE POLICY "Admins can manage students"
  ON public.students FOR ALL
  TO authenticated
  USING (public.authorize('students:update'))
  WITH CHECK (public.authorize('students:update'));

-- -----------------------------------------------------------------------------
-- 7. POLICIES: LEADS
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
CREATE POLICY "Public can submit leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage leads" ON public.leads;
CREATE POLICY "Admins can view and manage leads"
  ON public.leads FOR ALL
  TO authenticated
  USING (public.authorize('leads:read'))
  WITH CHECK (public.authorize('leads:update'));

-- -----------------------------------------------------------------------------
-- 8. POLICIES: WEBHOOK EVENTS
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view webhook events" ON public.webhook_events;
CREATE POLICY "Admins can view webhook events"
  ON public.webhook_events FOR SELECT
  TO authenticated
  USING (public.authorize('payments:read'));

-- -----------------------------------------------------------------------------
-- 9. POLICIES: PAYMENTS
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Students can view own payments" ON public.payments;
CREATE POLICY "Students can view own payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (student_id = auth.uid() OR public.authorize('payments:read'));

DROP POLICY IF EXISTS "Admins can manage payments" ON public.payments;
CREATE POLICY "Admins can manage payments"
  ON public.payments FOR ALL
  TO authenticated
  USING (public.authorize('payments:update'))
  WITH CHECK (public.authorize('payments:update'));
