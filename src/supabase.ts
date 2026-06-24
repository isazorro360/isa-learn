import { createClient } from '@supabase/supabase-js';

const normalizeEnvValue = (value: string | undefined) =>
  value?.trim().replace(/,$/, '').replace(/^["']|["']$/g, '');

const supabaseUrl = normalizeEnvValue(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = normalizeEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY);

const isMissingValue = (value: string | undefined) =>
  !value || value.trim() === '' || value.startsWith('YOUR_');

export const missingSupabaseConfigKeys = [
  isMissingValue(supabaseUrl) ? 'VITE_SUPABASE_URL' : '',
  isMissingValue(supabaseAnonKey) ? 'VITE_SUPABASE_ANON_KEY' : '',
].filter(Boolean);

export const isSupabaseConfigured = missingSupabaseConfigKeys.length === 0;

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://example.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'missing-anon-key'
);
