import { Award, Clock3, Zap } from 'lucide-react';

function MockExams() {
  return (
    <div className="layout space-y-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Mock Exams</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Timed quizzes with instant grading</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">Practice with realistic exam formats, track scores, and compare your performance on the leaderboard.</p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <Clock3 className="h-6 w-6 text-sky-600" />
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Timed quiz</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Mathematics practice</h2>
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">35 multiple choice questions designed to mirror WAEC and BECE style papers with immediate feedback after submission.</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-slate-100 px-3 py-2">15 mins</span>
            <span className="rounded-full bg-slate-100 px-3 py-2">20 questions</span>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <Zap className="h-6 w-6 text-emerald-600" />
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Instant grading</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Score history</h2>
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">Review your best attempts, compare progress across quizzes, and identify topics that need more practice.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Best score</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">88%</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Attempts</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">7</p>
            </div>
          </div>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Leaderboard</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Top performers</h3>
          <ol className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li>1. Ama K. — 96%</li>
            <li>2. Joseph A. — 94%</li>
            <li>3. Linda F. — 92%</li>
          </ol>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Quiz insights</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Master your weak areas</h3>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">Access targeted review lessons after each quiz, with explanations for every question and recommended follow-up notes.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-sky-50 p-6 shadow-sm dark:border-slate-800 dark:bg-sky-950/20">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <Award className="h-6 w-6 text-amber-500" />
            <div>
              <p className="text-sm uppercase tracking-[0.24em]">Achievement</p>
              <p className="mt-2 text-lg font-semibold">Quiz master</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">Complete 5 mock exams this week to unlock the Quiz Master badge and premium revision advice.</p>
        </div>
      </div>
    </div>
  );
}

export default MockExams;
