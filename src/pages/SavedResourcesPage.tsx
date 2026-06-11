import { Trash2 } from 'lucide-react';
import useBookmarks from '../hooks/useBookmarks';
import EmptyState from '../components/EmptyState';

function SavedResourcesPage() {
  const { bookmarks, loading, isBookmarked, removeBookmarkById } = useBookmarks();

  const handleRemoveBookmark = async (bookmarkId: string) => {
    await removeBookmarkById(bookmarkId);
  };

  return (
    <div className="layout space-y-10 pb-24 md:pb-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Your library</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Saved resources</h1>
          </div>
          <div className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-900/20 dark:text-sky-200">
            {bookmarks.length} saved
          </div>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-400">Loading your saved resources...</p>
        </div>
      ) : bookmarks.length > 0 ? (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <article key={bookmark.id} className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-sky-600">{bookmark.category}</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{bookmark.title}</h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{bookmark.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveBookmark(bookmark.id)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-200 dark:bg-rose-900/20 dark:text-rose-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-between rounded-3xl bg-slate-100 px-4 py-3 dark:bg-slate-950">
                  <span>Subject</span>
                  <span>{bookmark.subject}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-100 px-4 py-3 dark:bg-slate-950">
                  <span>Year</span>
                  <span>{bookmark.year}</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={bookmark.fileUrl}
                  download={bookmark.fileName}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  Download PDF
                </a>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <EmptyState title="No saved resources yet" description="Bookmark resources to access them quickly from your library." icon="📚" />
      )}
    </div>
  );
}

export default SavedResourcesPage;
