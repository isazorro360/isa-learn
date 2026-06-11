type SkeletonLoaderProps = {
  variant?: 'card' | 'text' | 'resource';
  count?: number;
};

function SkeletonLoader({ variant = 'card', count = 3 }: SkeletonLoaderProps) {
  if (variant === 'text') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" style={{ width: `${70 + Math.random() * 30}%` }} />
        ))}
      </div>
    );
  }

  if (variant === 'resource') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="h-5 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-1/2 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-900" />
              </div>
              <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="h-3 w-12 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-6 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-4 w-1/2 rounded-lg bg-slate-100 dark:bg-slate-900" />
          <div className="mt-6 h-4 w-1/3 rounded-lg bg-slate-100 dark:bg-slate-900" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
