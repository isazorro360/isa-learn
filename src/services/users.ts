import { supabase } from '../supabase';
import type { UserProfileDoc } from '../types';

type UserProfileRow = {
  id: string;
  email: string;
  display_name: string | null;
  roles: string[] | null;
  created_at: string | null;
};

const normalizeUserProfile = (row: UserProfileRow): UserProfileDoc => ({
  id: row.id,
  email: row.email,
  displayName: row.display_name || '',
  roles: Array.isArray(row.roles) && row.roles.length > 0 ? row.roles : ['student'],
  createdAt: row.created_at ? new Date(row.created_at) : new Date(),
});

export const getUserProfile = async (uid: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', uid)
    .maybeSingle();

  if (error) throw error;
  return data ? normalizeUserProfile(data as UserProfileRow) : null;
};

export const createOrUpdateUserProfile = async (
  uid: string,
  email: string,
  displayName: string,
  roles: string[] = ['student']
) => {
  const { error } = await supabase.from('users').upsert({
    id: uid,
    email,
    display_name: displayName,
    roles,
  });

  if (error) throw error;
  return uid;
};

export const fetchAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as UserProfileRow[]).map((row) => normalizeUserProfile(row));
};

export const updateUserRoles = async (uid: string, roles: string[]) => {
  const { error } = await supabase
    .from('users')
    .update({ roles })
    .eq('id', uid);

  if (error) throw error;
};
