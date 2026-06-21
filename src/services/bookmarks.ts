import { supabase } from '../supabase';

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

type BookmarkRow = {
  id: string;
  user_id: string;
  resource_id: string;
  title: string;
  subject: string;
  category: string;
  year: number;
  description: string;
  file_url: string;
  file_name: string;
  created_at: string | null;
};

const normalizeBookmark = (row: BookmarkRow): BookmarkDoc => ({
  id: row.id,
  userId: row.user_id,
  resourceId: row.resource_id,
  title: row.title,
  subject: row.subject,
  category: row.category,
  year: row.year,
  description: row.description,
  fileUrl: row.file_url,
  fileName: row.file_name,
  createdAt: row.created_at ? new Date(row.created_at) : new Date(),
});

export const getBookmarksForUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as BookmarkRow[]).map((row) => normalizeBookmark(row));
};

export const addBookmark = async (bookmark: Omit<BookmarkDoc, 'id' | 'createdAt'>) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({
      user_id: bookmark.userId,
      resource_id: bookmark.resourceId,
      title: bookmark.title,
      subject: bookmark.subject,
      category: bookmark.category,
      year: bookmark.year,
      description: bookmark.description,
      file_url: bookmark.fileUrl,
      file_name: bookmark.fileName,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id as string;
};

export const removeBookmark = async (bookmarkId: string) => {
  const { error } = await supabase.from('bookmarks').delete().eq('id', bookmarkId);
  if (error) throw error;
};
