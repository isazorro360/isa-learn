import { Mail, MessageCircle, Star, User } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-100 px-6 py-10 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="layout grid gap-8 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3 text-xl font-semibold text-slate-900 dark:text-white">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-white">IS</span>
            ISA Learn
          </div>
          <p className="max-w-md leading-7 text-slate-600 dark:text-slate-400">
            A modern study platform for SHS, CTVET, and tertiary learners in Ghana. Access notes, mock exams, past questions, and premium study resources in one place.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@isalearn.com</li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> +233 53 143 1315</li>
            <li className="flex items-center gap-2"><Star className="h-4 w-4" /> Accra, Ghana</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Connect</h3>
          <div className="mt-4 flex items-center gap-3">
            <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <Star className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
