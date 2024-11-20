// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Retrieve your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);