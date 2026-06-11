import type { Testimonial } from '../types';

function TestimonialCard({ name, role, quote }: Testimonial) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <p className="text-lg italic leading-8 text-slate-800 dark:text-slate-100">“{quote}”</p>
      <div className="mt-6">
        <p className="font-semibold text-slate-900 dark:text-white">{name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
      </div>
    </article>
  );
}

export default TestimonialCard;
