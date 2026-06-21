import { supabase } from '../supabase';

const BUCKET_NAME = 'past-questions';

export const uploadPastQuestionPdf = async (
  file: File,
  subject: string,
  year: number,
  onProgress?: (progress: number) => void
) => {
  const safeSubject = subject.trim().replace(/\s+/g, '-').toLowerCase();
  const filePath = `${safeSubject}/${year}/${Date.now()}-${file.name}`;

  onProgress?.(10);

  const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
    contentType: file.type || 'application/pdf',
    upsert: false,
  });

  if (error) throw error;

  onProgress?.(90);

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  onProgress?.(100);

  return {
    downloadUrl: data.publicUrl,
    filePath,
    fileName: file.name,
  };
};

export const deleteStorageFile = async (path: string) => {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);
  if (error) throw error;
};
