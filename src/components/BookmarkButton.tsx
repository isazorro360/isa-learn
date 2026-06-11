import { Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';

type BookmarkButtonProps = {
  resourceId: string;
  initialBookmarked?: boolean;
  onBookmarkChange?: (resourceId: string, isBookmarked: boolean) => void;
};

function BookmarkButton({ resourceId, initialBookmarked = false, onBookmarkChange }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  const handleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    onBookmarkChange?.(resourceId, newState);
  };

  return (
    <button
      onClick={handleBookmark}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
        isBookmarked
          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-200'
          : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900'
      }`}
    >
      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
      {isBookmarked ? 'Saved' : 'Save'}
    </button>
  );
}

export default BookmarkButton;
