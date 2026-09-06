-- Tech4Bharat 2026 Database Schema & Security
-- Initial Migration: profiles, hackathon_config, registrations, announcements

-- Enable pgcrypto for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. PROFILES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'participant' CHECK (role IN ('visitor', 'participant', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. HACKATHON CONFIG TABLE (Single source of truth for event parameters)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.hackathon_config (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. REGISTRATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for querying registrations by profile
CREATE INDEX IF NOT EXISTS idx_registrations_profile_id ON public.registrations(profile_id);

-- ============================================================================
-- 4. ANNOUNCEMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  audience TEXT NOT NULL DEFAULT 'all' CHECK (audience IN ('all', 'participants', 'admins')),
  published_at TIMESTAMPTZ
);

-- Index for published announcements
CREATE INDEX IF NOT EXISTS idx_announcements_published ON public.announcements(published_at, audience);

-- ============================================================================
-- 5. AUTOMATIC PROFILE TRIGGER ON AUTH SIGNUP
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NULL),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    COALESCE(NEW.raw_user_meta_data->>'role', 'participant')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathon_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- PROFILES POLICIES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid() OR public.is_admin())
  WITH CHECK (id = auth.uid() OR public.is_admin());

-- HACKATHON_CONFIG POLICIES (Public read, admin-only write)
DROP POLICY IF EXISTS "Public can view hackathon config" ON public.hackathon_config;
CREATE POLICY "Public can view hackathon config"
  ON public.hackathon_config FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can modify hackathon config" ON public.hackathon_config;
CREATE POLICY "Admins can modify hackathon config"
  ON public.hackathon_config FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- REGISTRATIONS POLICIES
DROP POLICY IF EXISTS "Participants can view own registrations" ON public.registrations;
CREATE POLICY "Participants can view own registrations"
  ON public.registrations FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Participants can insert own registration" ON public.registrations;
CREATE POLICY "Participants can insert own registration"
  ON public.registrations FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admins can update registrations" ON public.registrations;
CREATE POLICY "Admins can update registrations"
  ON public.registrations FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ANNOUNCEMENTS POLICIES
DROP POLICY IF EXISTS "Public can view published announcements" ON public.announcements;
CREATE POLICY "Public can view published announcements"
  ON public.announcements FOR SELECT
  TO anon, authenticated
  USING (
    published_at IS NOT NULL
    AND published_at <= NOW()
    AND (
      audience = 'all'
      OR (audience = 'participants' AND auth.role() = 'authenticated')
      OR public.is_admin()
    )
  );

DROP POLICY IF EXISTS "Admins can manage announcements" ON public.announcements;
CREATE POLICY "Admins can manage announcements"
  ON public.announcements FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================================
-- 7. INITIAL SEED DATA FOR CONFIRMED FACTS
-- ============================================================================
INSERT INTO public.hackathon_config (key, value, updated_at) VALUES
  ('event_name', '"Tech4Bharat 2026"', NOW()),
  ('theme', '"Scalable Innovations for Next-Gen India"', NOW()),
  ('positioning', '"India''s Biggest Hackathon"', NOW()),
  ('associated_summit', '"Global Accelerator Vision Summit (GAVS) 2026"', NOW()),
  ('registration_open_date', '"2026-09-07T00:00:00Z"', NOW()),
  ('registration_close_date', 'null', NOW()),
  ('event_start_date', '"2026-12-25T00:00:00Z"', NOW()),
  ('event_end_date', '"2026-12-27T23:59:59Z"', NOW()),
  ('location_city', '"Bengaluru, India"', NOW()),
  ('exact_venue', 'null', NOW()),
  ('format', '"Online preliminaries + on-site grand finale"', NOW()),
  ('platform_partner', '"HackCulture"', NOW()),
  ('host_institution', '"RV College of Engineering"', NOW()),
  ('prize_pool_total', '600000', NOW()),
  ('prizes', '[
    {"place": 1, "label": "1st Prize", "amount": 300000, "formatted": "₹3,00,000"},
    {"place": 2, "label": "2nd Prize", "amount": 200000, "formatted": "₹2,00,000"},
    {"place": 3, "label": "3rd Prize", "amount": 100000, "formatted": "₹1,00,000"}
  ]', NOW()),
  ('team_size_min', 'null', NOW()),
  ('team_size_max', 'null', NOW()),
  ('submission_deadline', 'null', NOW())
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value, updated_at = NOW();
