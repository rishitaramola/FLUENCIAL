-- =============================================================================
-- MIGRATION: 0002_auth_trigger
-- Description: Auto-creates a profiles row and a user_roles row whenever a
--              new user signs up through Supabase Auth. The full_name is
--              pulled from raw_user_meta_data (set by the register action).
-- Depends on:  0000_initial_schema (profiles, user_roles, app_role enum)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Trigger function
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create the public profile row
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'STUDENT'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Create the RBAC role row (used by the authorize() function)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'STUDENT')
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- -----------------------------------------------------------------------------
-- 2. Trigger on auth.users
-- -----------------------------------------------------------------------------
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
