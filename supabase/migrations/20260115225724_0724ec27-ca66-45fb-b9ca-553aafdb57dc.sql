-- 1. Restrict profiles to authenticated users only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles" 
ON public.profiles 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- 2. Create function to validate avatar file extensions (prevent SVG XSS and other dangerous files)
CREATE OR REPLACE FUNCTION public.is_valid_avatar_extension(file_path text)
RETURNS boolean AS $$
BEGIN
  -- Only allow specific safe image extensions (no SVG to prevent XSS)
  RETURN file_path ~* '\.(jpg|jpeg|png|gif|webp)$';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. Update storage upload policy to validate file extensions
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND public.is_valid_avatar_extension(name)
);