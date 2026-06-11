import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { UserProfileDoc } from '../types';

const usersCollection = collection(db, 'users');

const normalizeUserProfile = (docSnap: any): UserProfileDoc => {
  const data = docSnap.data() as any;
  return {
    id: docSnap.id,
    email: data.email,
    displayName: data.displayName || '',
    roles: Array.isArray(data.roles) && data.roles.length > 0 ? data.roles : ['student'],
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
  };
};

export const getUserProfile = async (uid: string) => {
  const userDoc = doc(usersCollection, uid);
  const snapshot = await getDoc(userDoc);
  if (!snapshot.exists()) {
    return null;
  }
  return normalizeUserProfile(snapshot);
};

export const createOrUpdateUserProfile = async (
  uid: string,
  email: string,
  displayName: string,
  roles: string[] = ['student']
) => {
  const userDoc = doc(usersCollection, uid);

  await setDoc(
    userDoc,
    {
      email,
      displayName,
      roles,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );

  return uid;
};

export const fetchAllUsers = async () => {
  const q = query(usersCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => normalizeUserProfile(docSnap));
};

export const updateUserRoles = async (uid: string, roles: string[]) => {
  const userDocRef = doc(usersCollection, uid);
  await updateDoc(userDocRef, {
    roles,
  });
};
