import type { User } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { createOrUpdateUserProfile } from './users';

export const ADMIN_EMAILS = ['admin@isaitech.com'];

export type FirebaseUser = User | null;

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return { user: data.user };
};

export const registerUser = async (email: string, password: string, displayName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { displayName },
    },
  });

  if (error) throw error;

  if (data.user) {
    await createOrUpdateUserProfile(data.user.id, email, displayName, ['student']);
  }

  return { user: data.user };
};

export const logoutUser = () => supabase.auth.signOut();

export const authStateListener = (callback: (user: FirebaseUser) => void) => {
  supabase.auth.getUser().then(({ data }) => callback(data.user));

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => data.subscription.unsubscribe();
};

export const sendPasswordReset = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth`,
  });
  if (error) throw error;
};

export const sendVerificationEmailToCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    throw new Error('No authenticated user available for verification email.');
  }

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: user.email,
  });

  if (error) throw error;
};

export const isAdminUser = (user: FirebaseUser) =>
  !!user && !!user.email && ADMIN_EMAILS.includes(user.email);

export const sendSignInLink = async (email: string, appUrl: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: appUrl,
    },
  });
  if (error) throw error;
  window.localStorage.setItem('emailForSignIn', email);
};

export const handleEmailLinkSignIn = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  window.localStorage.removeItem('emailForSignIn');
  return { user: data.session?.user ?? null };
};
