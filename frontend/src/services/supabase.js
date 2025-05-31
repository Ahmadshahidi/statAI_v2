import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with public anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url' || supabaseAnonKey === 'your_supabase_anon_key') {
  throw new Error(
    'Missing Supabase credentials. Please update your .env file with valid credentials:\n' +
    '1. Go to your Supabase project dashboard\n' +
    '2. Click on the "Settings" icon (gear/cog) in the sidebar\n' +
    '3. Click on "API" in the settings menu\n' +
    '4. Copy "Project URL" to VITE_SUPABASE_URL\n' +
    '5. Copy "anon/public" key to VITE_SUPABASE_ANON_KEY'
  );
}

// Validate URL format before creating client
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid Supabase URL format. Please check your VITE_SUPABASE_URL in .env file. Error: ${error.message}`);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;