import { Lock, X, Check } from 'lucide-react';

type PremiumUpgradeModalProps = {
  onClose: () => void;
  onUpgrade: () => void;
  resourceTitle: string;
};

function PremiumUpgradeModal({ onClose, onUpgrade, resourceTitle }: PremiumUpgradeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-sky-600" />
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Premium Resource</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8">
          <p className="text-lg text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">"{resourceTitle}"</span> is a premium resource available for premium members only.
          </p>

          <div className="mt-8 rounded-3xl bg-sky-50 p-8 dark:bg-sky-900/10">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Unlock Premium Benefits</h3>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="h-5 w-5 text-emerald-500" />
                Access all premium notes and resources
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="h-5 w-5 text-emerald-500" />
                Download PDFs offline for any subject
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="h-5 w-5 text-emerald-500" />
                Unlimited mock exams with instant grading
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="h-5 w-5 text-emerald-500" />
                Exclusive tutoring support
              </li>
            </ul>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button onClick={onClose} className="rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
              Continue Free
            </button>
            <button onClick={onUpgrade} className="rounded-full bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumUpgradeModal;
