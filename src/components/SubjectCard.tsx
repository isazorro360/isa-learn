import type { Subject } from '../types';

function SubjectCard({ title, description, difficulty, resources, color }: Subject) {
  return (
    <article className={`group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900`}>
      <div className={`mb-6 h-2 rounded-full bg-gradient-to-r ${color}`} />
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>{difficulty}</span>
        <span>{resources} resources</span>
      </div>
    </article>
  );
}

export default SubjectCard;
