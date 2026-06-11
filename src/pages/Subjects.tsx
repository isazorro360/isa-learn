import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { subjects } from '../data';

function Subjects() {
  return (
    <div className="layout space-y-10 pb-24 md:pb-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Subjects</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Browse study categories</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">Choose a subject, review notes, access past questions, and unlock premium resources for exam success.</p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {subjects.map((subject) => (
          <Link key={subject.id} to={`/subject/${subject.id}`}>
            <article className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className={`bg-gradient-to-br ${subject.color} h-24 p-6 text-3xl`}>{subject.icon}</div>
              <div className="p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white">{subject.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{subject.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{subject.resources} resources</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">{subject.difficulty}</span>
                </div>
                <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition group-hover:gap-3">
                  Explore <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Subjects;
