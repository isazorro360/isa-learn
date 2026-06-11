import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';

export const uploadPastQuestionPdf = (
  file: File,
  subject: string,
  year: number,
  onProgress?: (progress: number) => void
) => {
  const safeSubject = subject.trim().replace(/\s+/g, '-').toLowerCase();
  const storagePath = `past-questions/${safeSubject}/${year}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: file.type || 'application/pdf',
  });

  return new Promise<{ downloadUrl: string; filePath: string; fileName: string }>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress?.(percent);
      },
      reject,
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ downloadUrl, filePath: storagePath, fileName: file.name });
      }
    );
  });
};

export const deleteStorageFile = async (path: string) => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};
