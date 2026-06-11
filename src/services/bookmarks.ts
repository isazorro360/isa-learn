import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

export type BookmarkDoc = {
  id: string;
  userId: string;
  resourceId: string;
  title: string;
  subject: string;
  category: string;
  year: number;
  description: string;
  fileUrl: string;
  fileName: string;
  createdAt: Date;
};

export type BookmarkCreate = Omit<BookmarkDoc, 'id' | 'createdAt'>;

const bookmarksCollection = collection(db, 'bookmarks');

export const addBookmark = async (bookmark: BookmarkCreate) => {
  const docRef = await addDoc(bookmarksCollection, {
    ...bookmark,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getBookmarksForUser = async (userId: string) => {
  const q = query(bookmarksCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data() as any;
    return {
      id: docSnapshot.id,
      userId: data.userId,
      resourceId: data.resourceId,
      title: data.title,
      subject: data.subject,
      category: data.category,
      year: data.year,
      description: data.description,
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
    } as BookmarkDoc;
  });
};

export const removeBookmark = async (bookmarkId: string) => {
  await deleteDoc(doc(bookmarksCollection, bookmarkId));
};

export const findBookmarkByResourceId = async (userId: string, resourceId: string) => {
  const q = query(bookmarksCollection, where('userId', '==', userId), where('resourceId', '==', resourceId));
  const snapshot = await getDocs(q);

  return snapshot.docs.length > 0
    ? {
        id: snapshot.docs[0].id,
        ...(snapshot.docs[0].data() as Omit<BookmarkDoc, 'id'>),
      } as BookmarkDoc
    : null;
};
