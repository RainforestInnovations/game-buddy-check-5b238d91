-- Restrict reviews to authenticated users only (prevents anonymous scraping of user hardware info)
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Authenticated users can view reviews" 
ON public.reviews 
FOR SELECT 
USING (auth.role() = 'authenticated');