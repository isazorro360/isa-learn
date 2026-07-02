import type React from 'react';

export type CourseCardProps = {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  thumbnailAlt: string;
  onContinue?: () => void;
};

function CourseCard({ title, description, difficulty, duration, thumbnailAlt, onContinue }: CourseCardProps) {
  const badgeStyles =
    difficulty === 'Beginner'
      ? 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
      : difficulty === 'Intermediate'
        ? 'bg-sky-500/15 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300'
        : 'bg-violet-500/15 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300';

  return (
    <article className="group overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="relative">
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-sky-500/20 via-emerald-500/15 to-violet-500/20" aria-hidden="true" />
        <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur dark:bg-slate-900/60 dark:text-slate-200">
          Course
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
          <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles}`}>{difficulty}</span>
        </div>
        <p className="min-h-[3rem] text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{duration}</div>
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
            aria-label={`Continue learning: ${title}`}
          >
            Continue Learning
            <span className="inline-block transition group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;

