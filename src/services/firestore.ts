import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type QueryConstraint,
} from 'firebase/firestore';
import { db } from '../firebase';
import { PastQuestionDoc } from '../types';

const pastQuestionsCollection = collection(db, 'past_questions');

export type FirebasePastQuestion = Omit<PastQuestionDoc, 'id' | 'createdAt'> & {
  createdAt: any;
};

const normalizePastQuestion = (docSnap: any): PastQuestionDoc => {
  const data = docSnap.data() as any;
  const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();

  return {
    id: docSnap.id,
    title: data.title,
    subject: data.subject,
    year: data.year,
    category: data.category,
    description: data.description,
    fileName: data.fileName,
    fileUrl: data.fileUrl,
    storagePath: data.storagePath,
    uploadedBy: data.uploadedBy,
    createdAt,
  };
};

export const addPastQuestionToFirestore = async (
  data: Omit<PastQuestionDoc, 'id' | 'createdAt'>
) => {
  const docRef = await addDoc(pastQuestionsCollection, {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const fetchPastQuestions = async (filters?: {
  subject?: string;
  year?: number;
  category?: string;
}) => {
  const constraints: QueryConstraint[] = [];
  if (filters?.subject) constraints.push(where('subject', '==', filters.subject));
  if (filters?.year) constraints.push(where('year', '==', filters.year));
  if (filters?.category) constraints.push(where('category', '==', filters.category));
  constraints.push(orderBy('createdAt', 'desc'));

  const q = query(pastQuestionsCollection, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => normalizePastQuestion(docSnap));
};

export const fetchPastQuestionById = async (id: string) => {
  const docRef = doc(pastQuestionsCollection, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return normalizePastQuestion(snapshot);
};

export const updatePastQuestion = async (
  id: string,
  data: Partial<Omit<PastQuestionDoc, 'id' | 'createdAt'>>
) => {
  const docRef = doc(pastQuestionsCollection, id);
  await updateDoc(docRef, data);
};

export const deletePastQuestion = async (id: string) => {
  const docRef = doc(pastQuestionsCollection, id);
  await deleteDoc(docRef);
};
