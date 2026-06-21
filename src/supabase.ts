import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isMissingValue = (value: string | undefined) =>
  !value || value.trim() === '' || value.startsWith('YOUR_');

export const missingSupabaseConfigKeys = [
  isMissingValue(supabaseUrl) ? 'VITE_SUPABASE_URL' : '',
  isMissingValue(supabaseAnonKey) ? 'VITE_SUPABASE_ANON_KEY' : '',
].filter(Boolean);

export const isSupabaseConfigured = missingSupabaseConfigKeys.length === 0;

export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseAnonKey || 'missing-anon-key'
);
