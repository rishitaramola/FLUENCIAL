-- 1. ENUMS
CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'FOLLOW_UP', 'INTERESTED', 'REGISTERED', 'CONVERTED', 'CLOSED');
CREATE TYPE student_status AS ENUM ('LEAD', 'ENROLLED', 'ACTIVE', 'COMPLETED', 'INACTIVE');
CREATE TYPE payment_status AS ENUM ('CREATED', 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'LATE');
CREATE TYPE skill AS ENUM ('SPEAKING', 'LISTENING', 'READING', 'WRITING', 'GRAMMAR', 'VOCABULARY', 'PRONUNCIATION', 'MOCK_EXAM');
CREATE TYPE app_role AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- 2. RBAC TABLES
CREATE TABLE user_roles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role app_role NOT NULL DEFAULT 'STUDENT'
);
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE TABLE role_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role app_role NOT NULL,
  permission TEXT NOT NULL,
  UNIQUE(role, permission)
);
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- 3. AUTHORIZE FUNCTION (Security Definer, Blank Search Path)
CREATE OR REPLACE FUNCTION authorize(requested_permission TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.role_permissions rp
    WHERE rp.permission = requested_permission
    AND rp.role = (current_setting('request.jwt.claims', true)::jsonb ->> 'user_role')::public.app_role
  );
END;
$$;

-- 4. CUSTOM ACCESS TOKEN HOOK
CREATE OR REPLACE FUNCTION custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    claims jsonb;
    user_role public.app_role;
BEGIN
    SELECT role INTO user_role FROM public.user_roles WHERE user_id = (event->>'user_id')::uuid;
    claims := event->'claims';
    IF user_role IS NOT NULL THEN
        claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    ELSE
        claims := jsonb_set(claims, '{user_role}', '"STUDENT"');
    END IF;
    event := jsonb_set(event, '{claims}', claims);
    RETURN event;
END;
$$;

-- 5. PROFILES TABLE
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role app_role NOT NULL DEFAULT 'STUDENT',
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;