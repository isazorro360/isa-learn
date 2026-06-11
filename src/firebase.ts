import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { firebaseConfig } from './firebase/config';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulator if in development
if (import.meta.env.DEV) {
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
