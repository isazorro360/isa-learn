import { useState } from 'react';
import { ShieldCheck, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { logoutUser, sendVerificationEmailToCurrentUser } from '../services/auth';

function Profile() {
  const { user, loading, profile } = useAuth();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sendingVerification, setSendingVerification] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="layout py-24 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">...</div>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Loading profile…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="layout py-24">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Profile access</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">Sign in to view your profile</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Your account details and verification status are available after logging in.</p>
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="mt-6 inline-flex rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Go to login
            </button>
          </div>
        </section>
      </div>
    );
  }

  const fullName = user.displayName || user.email?.split('@')[0] || 'Student';
  const verified = user.emailVerified;

  const handleLogout = async () => {
    await logoutUser();
    navigate('/auth');
  };

  const handleResendVerification = async () => {
    setFeedbackMessage('');
    setErrorMessage('');
    setSendingVerification(true);
    try {
      await sendVerificationEmailToCurrentUser();
      setFeedbackMessage('Verification email resent. Please check your inbox.');
    } catch (error) {
      console.error(error);
      setErrorMessage('Unable to resend verification email at the moment.');
    } finally {
      setSendingVerification(false);
    }
  };

  return (
    <div className="layout space-y-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Profile</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Student details</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className={`rounded-full px-5 py-3 text-sm font-semibold ${verified ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-200'}`}>
              {verified ? 'Email verified' : 'Verification pending'}
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>

        {feedbackMessage && <div className="mt-6 rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">{feedbackMessage}</div>}
        {errorMessage && <div className="mt-6 rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-200">{errorMessage}</div>}

        {!verified && (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-3xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
            <p>Please verify your email to unlock the full ISA Learn experience.</p>
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={sendingVerification}
              className="rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-50"
            >
              {sendingVerification ? 'Sending…' : 'Resend verification email'}
            </button>
          </div>
        )}
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Full name</p>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{fullName}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Email</p>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{user.email}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Role</p>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{profile?.roles?.join(', ') || 'student'}</p>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Study goal</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Complete 14 resources this month</h3>
            </div>
            <ShieldCheck className="h-10 w-10 rounded-3xl bg-sky-100 p-2 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300" />
          </div>
          <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">Your profile now reflects your real account status, and you can sign out securely when you’re done studying.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-100 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Badges</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">3 unlocked</h3>
            </div>
            <Trophy className="h-10 w-10 rounded-3xl bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />
          </div>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <li>• Study streak achievement</li>
            <li>• Top performer in weekly quiz</li>
            <li>• Profile completed</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Profile;
