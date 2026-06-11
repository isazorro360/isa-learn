import { ArrowRight } from 'lucide-react';

type CourseCardProps = {
  title: string;
  summary: string;
  tag: string;
  premium?: boolean;
};

function CourseCard({ title, summary, tag, premium }: CourseCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">{tag}</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        </div>
        {premium && <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white dark:bg-slate-100 dark:text-slate-900">Premium</span>}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{summary}</p>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-sky-600">
        <span>View details</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </article>
  );
}

export default CourseCard;
