const normalizeEnvValue = (value: string | undefined) =>
  value?.trim().replace(/,$/, '').replace(/^["']|["']$/g, '');

const requiredFirebaseEnv = {
  VITE_FIREBASE_API_KEY: normalizeEnvValue(import.meta.env.VITE_FIREBASE_API_KEY),
  VITE_FIREBASE_AUTH_DOMAIN: normalizeEnvValue(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  VITE_FIREBASE_PROJECT_ID: normalizeEnvValue(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  VITE_FIREBASE_STORAGE_BUCKET: normalizeEnvValue(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  VITE_FIREBASE_MESSAGING_SENDER_ID: normalizeEnvValue(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  VITE_FIREBASE_APP_ID: normalizeEnvValue(import.meta.env.VITE_FIREBASE_APP_ID),
};

const isMissingValue = (value: string | undefined) =>
  !value || value.trim() === '' || value.startsWith('YOUR_');

export const missingFirebaseConfigKeys = Object.entries(requiredFirebaseEnv)
  .filter(([, value]) => isMissingValue(value))
  .map(([key]) => key);

export const useFirebaseEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';
export const isFirebaseConfigured = missingFirebaseConfigKeys.length === 0;
export const isFirebaseReady = isFirebaseConfigured || useFirebaseEmulators;

export const firebaseConfig = {
  apiKey: requiredFirebaseEnv.VITE_FIREBASE_API_KEY ?? '',
  authDomain: requiredFirebaseEnv.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: requiredFirebaseEnv.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: requiredFirebaseEnv.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: requiredFirebaseEnv.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: requiredFirebaseEnv.VITE_FIREBASE_APP_ID ?? '',
};
