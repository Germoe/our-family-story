-- Create admin_users table to track who can edit
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admins can view their own record
CREATE POLICY "Users can view their own admin status"
ON public.admin_users FOR SELECT
USING (auth.uid() = user_id);

-- Create a security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = check_user_id
  )
$$;

-- Drop old permissive policies on profile_content
DROP POLICY IF EXISTS "Authenticated users can insert profile content" ON public.profile_content;
DROP POLICY IF EXISTS "Authenticated users can update profile content" ON public.profile_content;
DROP POLICY IF EXISTS "Authenticated users can delete profile content" ON public.profile_content;

-- Create new admin-only policies
CREATE POLICY "Only admins can insert profile content"
ON public.profile_content FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update profile content"
ON public.profile_content FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete profile content"
ON public.profile_content FOR DELETE
USING (public.is_admin(auth.uid()));

-- Update storage policies to admin-only
DROP POLICY IF EXISTS "Authenticated users can upload profile media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update profile media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete profile media" ON storage.objects;

CREATE POLICY "Only admins can upload profile media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-media' AND public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update profile media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-media' AND public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete profile media"
ON storage.objects FOR DELETE
USING (bucket_id = 'profile-media' AND public.is_admin(auth.uid()));