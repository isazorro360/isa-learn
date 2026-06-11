import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth } from '../firebase';
import { createOrUpdateUserProfile } from './users';

export const ADMIN_EMAILS = ['admin@isaitech.com'];

export type FirebaseUser = User | null;

export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerUser = async (email: string, password: string, displayName: string) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName });
    await sendEmailVerification(auth.currentUser);
    await createOrUpdateUserProfile(auth.currentUser.uid, email, displayName, ['student']);
  }
  return credential;
};

export const logoutUser = () => signOut(auth);

export const authStateListener = (callback: (user: FirebaseUser) => void) =>
  onAuthStateChanged(auth, callback);

export const sendPasswordReset = (email: string) =>
  sendPasswordResetEmail(auth, email);

export const sendVerificationEmailToCurrentUser = () => {
  if (!auth.currentUser) {
    throw new Error('No authenticated user available for verification email.');
  }
  return sendEmailVerification(auth.currentUser);
};

export const isAdminUser = (user: FirebaseUser) =>
  !!user && !!user.email && ADMIN_EMAILS.includes(user.email);

// Send sign-in link to user
export const sendSignInLink = async (email: string, appUrl: string) => {
  const actionCodeSettings = {
    url: appUrl, // e.g., 'http://localhost:5173/auth?signinlink=true'
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  // Save email in localStorage so user can see it after email verification
  window.localStorage.setItem('emailForSignIn', email);
};

// Check if user clicked the email link
export const handleEmailLinkSignIn = async (email?: string) => {
  if (!isSignInWithEmailLink(auth, window.location.href)) {
    throw new Error('Invalid sign-in link');
  }
  const savedEmail = email || window.localStorage.getItem('emailForSignIn') || '';
  const credential = await signInWithEmailLink(auth, savedEmail, window.location.href);
  window.localStorage.removeItem('emailForSignIn');
  return credential;
};
