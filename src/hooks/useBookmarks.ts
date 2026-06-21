import { useEffect, useMemo, useState } from 'react';
import useAuth from './useAuth';
import { addBookmark, getBookmarksForUser, removeBookmark, type BookmarkDoc } from '../services/bookmarks';

export default function useBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBookmarks = async () => {
      if (!user) {
        setBookmarks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const docs = await getBookmarksForUser(user.id);
        setBookmarks(docs);
      } catch (err) {
        console.error(err);
        setError('Unable to load saved bookmarks.');
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, [user]);

  const bookmarkMap = useMemo(
    () => new Map(bookmarks.map((bookmark) => [bookmark.resourceId, bookmark])),
    [bookmarks]
  );

  const isBookmarked = (resourceId: string) => bookmarkMap.has(resourceId);

  type BookmarkInput = Omit<BookmarkDoc, 'id' | 'createdAt' | 'userId'>;

  const toggleBookmark = async (bookmarkData: BookmarkInput) => {
    if (!user) {
      setError('Sign in to bookmark resources.');
      return null;
    }

    const existingBookmark = bookmarkMap.get(bookmarkData.resourceId);

    if (existingBookmark) {
      await removeBookmark(existingBookmark.id);
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== existingBookmark.id));
      return null;
    }

    const newBookmarkId = await addBookmark({ ...bookmarkData, userId: user.id });
    const newBookmark: BookmarkDoc = {
      id: newBookmarkId,
      ...bookmarkData,
      userId: user.id,
      createdAt: new Date(),
    };

    setBookmarks((prev) => [newBookmark, ...prev]);
    return newBookmark;
  };

  const removeBookmarkById = async (bookmarkId: string) => {
    await removeBookmark(bookmarkId);
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== bookmarkId));
  };

  return {
    bookmarks,
    loading,
    error,
    isBookmarked,
    toggleBookmark,
    removeBookmarkById,
  };
}
