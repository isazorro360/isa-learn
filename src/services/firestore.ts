import { supabase } from '../supabase';
import { PastQuestionDoc } from '../types';

type PastQuestionRow = {
  id: string;
  title: string;
  subject: string;
  year: number;
  category: 'Past Question' | 'Marking Scheme' | 'Notes';
  description: string;
  file_name: string;
  file_url: string;
  storage_path?: string | null;
  uploaded_by: string;
  created_at: string | null;
};

const normalizePastQuestion = (row: PastQuestionRow): PastQuestionDoc => ({
  id: row.id,
  title: row.title,
  subject: row.subject,
  year: row.year,
  category: row.category,
  description: row.description,
  fileName: row.file_name,
  fileUrl: row.file_url,
  storagePath: row.storage_path || undefined,
  uploadedBy: row.uploaded_by,
  createdAt: row.created_at ? new Date(row.created_at) : new Date(),
});

export const addPastQuestionToFirestore = async (
  data: Omit<PastQuestionDoc, 'id' | 'createdAt'>
) => {
  const { data: inserted, error } = await supabase
    .from('past_questions')
    .insert({
      title: data.title,
      subject: data.subject,
      year: data.year,
      category: data.category,
      description: data.description,
      file_name: data.fileName,
      file_url: data.fileUrl,
      storage_path: data.storagePath,
      uploaded_by: data.uploadedBy,
    })
    .select('id')
    .single();

  if (error) throw error;
  return inserted.id as string;
};

export const fetchPastQuestions = async (filters?: {
  subject?: string;
  year?: number;
  category?: string;
}) => {
  let query = supabase
    .from('past_questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.subject) query = query.eq('subject', filters.subject);
  if (filters?.year) query = query.eq('year', filters.year);
  if (filters?.category) query = query.eq('category', filters.category);

  const { data, error } = await query;
  if (error) throw error;
  return (data as PastQuestionRow[]).map((row) => normalizePastQuestion(row));
};

export const fetchPastQuestionById = async (id: string) => {
  const { data, error } = await supabase
    .from('past_questions')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? normalizePastQuestion(data as PastQuestionRow) : null;
};

export const updatePastQuestion = async (
  id: string,
  data: Partial<Omit<PastQuestionDoc, 'id' | 'createdAt'>>
) => {
  const updateData: Record<string, unknown> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.subject !== undefined) updateData.subject = data.subject;
  if (data.year !== undefined) updateData.year = data.year;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.fileName !== undefined) updateData.file_name = data.fileName;
  if (data.fileUrl !== undefined) updateData.file_url = data.fileUrl;
  if (data.storagePath !== undefined) updateData.storage_path = data.storagePath;
  if (data.uploadedBy !== undefined) updateData.uploaded_by = data.uploadedBy;

  const { error } = await supabase.from('past_questions').update(updateData).eq('id', id);
  if (error) throw error;
};

export const deletePastQuestion = async (id: string) => {
  const { error } = await supabase.from('past_questions').delete().eq('id', id);
  if (error) throw error;
};
