-- Drop the existing permissive policy that allows anyone to view feedback
DROP POLICY IF EXISTS "Anyone can view feedback" ON public.feedback;

-- Create a new policy that only allows authenticated users to view feedback
CREATE POLICY "Authenticated users can view feedback"
ON public.feedback
FOR SELECT
USING (auth.role() = 'authenticated');