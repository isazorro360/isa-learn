import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { firebaseConfig, isFirebaseReady, missingFirebaseConfigKeys, useFirebaseEmulators } from './firebase/config';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (!isFirebaseReady) {
  console.warn(
    `Firebase is missing required environment values: ${missingFirebaseConfigKeys.join(', ')}. ` +
      'Add them to .env or set VITE_USE_FIREBASE_EMULATORS=true for local emulator testing.'
  );
}

if (import.meta.env.DEV && useFirebaseEmulators) {
  try {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    console.log('Connected to Auth Emulator');
  } catch (error) {
    console.warn('Auth Emulator not available:', error);
  }
  
  try {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    console.log('Connected to Firestore Emulator');
  } catch (error) {
    console.warn('Firestore Emulator not available:', error);
  }
  
  try {
    connectStorageEmulator(storage, '127.0.0.1', 9199);
    console.log('Connected to Storage Emulator');
  } catch (error) {
    console.warn('Storage Emulator not available:', error);
  }
}
