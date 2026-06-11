import { CreditCard, Diamond, ShieldCheck } from 'lucide-react';

function Premium() {
  return (
    <div className="layout space-y-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Premium membership</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Choose the plan that fits your study goals</h1>
          </div>
          <button className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">Subscribe now</button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="inline-flex items-center gap-3 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-900/20 dark:text-sky-200">
            <CreditCard className="h-4 w-4" /> Free plan
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">Free</h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">Access core notes, basic mock exams, and selected past questions without a subscription.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li>• Subject notes</li>
            <li>• Selected mock quizzes</li>
            <li>• Basic progress tracking</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-sky-600 bg-sky-600 p-8 text-white shadow-xl shadow-sky-500/20">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em]">Premium</div>
          <h2 className="mt-6 text-3xl font-semibold">Premium</h2>
          <p className="mt-4 leading-7 text-slate-100">Unlock exclusive notes, full past question archives, and advanced mock exams with instant grading and detailed answer walkthroughs.</p>
          <ul className="mt-6 space-y-3 text-sm text-sky-100/90">
            <li>• Premium answers and solutions</li>
            <li>• Mobile Money ready subscription</li>
            <li>• Exclusive support and analytics</li>
          </ul>
          <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-sky-600 transition hover:bg-slate-100">
            Upgrade now
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <ShieldCheck className="h-4 w-4" /> Secure checkout
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">Mobile Money integration ready</h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">Prepare for an easy Ghana payment flow with subscription pages that connect to MTN Mobile Money and Vodafone Cash gateways.</p>
        </div>
      </div>
    </div>
  );
}

export default Premium;
