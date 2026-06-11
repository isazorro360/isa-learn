import { Search } from 'lucide-react';

const notes = [
  { title: 'Mathematics formulas and solutions', subject: 'Mathematics', premium: false },
  { title: 'English Language exam toolkit', subject: 'English Language', premium: false },
  { title: 'Integrated Science revision guide', subject: 'Integrated Science', premium: true },
  { title: 'Electrical Engineering fundamentals', subject: 'Electrical Engineering', premium: true },
  { title: 'ICT digital skills handbook', subject: 'ICT', premium: false },
];

function Notes() {
  return (
    <div className="layout space-y-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Notes</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Browse notes by subject</h1>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
            <Search className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            <input placeholder="Search notes" className="w-full border-0 bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-slate-100" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {notes.map((note) => (
          <article key={note.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{note.title}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{note.subject}</p>
              </div>
              {note.premium && <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white dark:bg-slate-100 dark:text-slate-900">Premium</span>}
            </div>
            <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
              <span>Bookmark</span>
              <button type="button" className="rounded-full bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-700">View</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Notes;
