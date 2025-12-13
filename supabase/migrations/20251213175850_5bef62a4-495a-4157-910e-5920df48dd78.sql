-- Create storage bucket for profile media
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-media', 'profile-media', true);

-- Create storage policies for profile media
CREATE POLICY "Anyone can view profile media"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-media');

CREATE POLICY "Authenticated users can upload profile media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update profile media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete profile media"
ON storage.objects FOR DELETE
USING (bucket_id = 'profile-media' AND auth.role() = 'authenticated');

-- Create profile_content table to store all editable content
CREATE TABLE public.profile_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL UNIQUE,
  content_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profile_content
ALTER TABLE public.profile_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read profile content (it's a public profile)
CREATE POLICY "Anyone can view profile content"
ON public.profile_content FOR SELECT
USING (true);

-- Only authenticated users can modify content
CREATE POLICY "Authenticated users can insert profile content"
ON public.profile_content FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update profile content"
ON public.profile_content FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete profile content"
ON public.profile_content FOR DELETE
USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profile_content_updated_at
BEFORE UPDATE ON public.profile_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();