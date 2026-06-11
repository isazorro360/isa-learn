import { Download, Eye, Lock, Share2 } from 'lucide-react';
import type { Resource } from '../types';
import BookmarkButton from './BookmarkButton';

type ResourceCardProps = Resource & {
  onViewClick?: (resource: Resource) => void;
  onDownloadClick?: (resource: Resource) => void;
  onShareClick?: (resource: Resource) => void;
  isPremiumUser?: boolean;
  isBookmarked?: boolean;
  onBookmarkChange?: (resourceId: string, bookmarked: boolean) => void;
};

function ResourceCard({
  id,
  title,
  subject,
  type,
  year,
  downloads,
  uploadedAt,
  premium,
  description,
  onViewClick,
  onDownloadClick,
  onShareClick,
  isPremiumUser,
  isBookmarked = false,
  onBookmarkChange,
}: ResourceCardProps) {
  const canAccess = !premium || isPremiumUser;

  return (
    <article className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 ${!canAccess ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            {premium && <Lock className="h-4 w-4 text-sky-600" />}
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {type}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm text-slate-600 dark:text-slate-400">
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">Year</p>
          <p className="mt-1 font-semibold">{year}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">Downloads</p>
          <p className="mt-1 font-semibold">{downloads.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">Added</p>
          <p className="mt-1 font-semibold">{uploadedAt}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => onViewClick?.({ id, title, subject, type, year, downloads, uploadedAt, premium, description })}
          disabled={!canAccess}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            canAccess ? 'bg-sky-600 text-white hover:bg-sky-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800'
          }`}
        >
          <Eye className="h-4 w-4" /> View
        </button>
        <button
          onClick={() => onDownloadClick?.({ id, title, subject, type, year, downloads, uploadedAt, premium, description })}
          disabled={!canAccess}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            canAccess ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900' : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <Download className="h-4 w-4" /> Download
        </button>
        <BookmarkButton resourceId={id} initialBookmarked={isBookmarked} onBookmarkChange={onBookmarkChange} />
        <button
          onClick={() => onShareClick?.({ id, title, subject, type, year, downloads, uploadedAt, premium, description })}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default ResourceCard;
