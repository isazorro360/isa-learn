import { FormEvent, useEffect, useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  loginUser,
  registerUser,
  sendPasswordReset,
} from '../services/auth';
import useAuth from '../hooks/useAuth';
import { isSupabaseConfigured, missingSupabaseConfigKeys } from '../supabase';

function Auth() {
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      const fromPath = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(fromPath, { replace: true });
    }
  }, [loading, user, navigate, location.state]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    if (!email || (mode !== 'reset' && !password)) {
      setErrorMessage('Please enter the required fields.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    if (!isSupabaseConfigured) {
      setErrorMessage(`Supabase is not configured yet. Add ${missingSupabaseConfigKeys.join(', ')} to your .env file and Vercel environment variables.`);
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await loginUser(email, password);
        navigate('/dashboard');
      } else if (mode === 'register') {
        await registerUser(email, password, name);
        setStatusMessage('Account created. Verification email sent — please confirm your address before signing in.');
        setMode('login');
      } else {
        await sendPasswordReset(email);
        setStatusMessage('Password reset link sent. Check your email to continue.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Authentication failed. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="layout mx-auto max-w-3xl space-y-10">
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Account access</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              {mode === 'login'
                ? 'Log in to ISA Learn'
                : mode === 'register'
                ? 'Create your student account'
                : 'Reset your password'}
            </h1>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {mode === 'login' ? 'Returning student' : mode === 'register' ? 'New student' : 'Password reset'}
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {mode === 'register' && (
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full name</span>
              <div className="mt-3 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                <User className="h-5 w-5 text-sky-600" />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  placeholder="Your full name"
                  className="w-full border-0 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 dark:text-slate-100"
                />
              </div>
            </label>
          )}
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email address</span>
            <div className="mt-3 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
              <Mail className="h-5 w-5 text-sky-600" />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full border-0 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 dark:text-slate-100"
              />
            </div>
          </label>
          {mode !== 'reset' && (
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</span>
              <div className="mt-3 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                <Lock className="h-5 w-5 text-sky-600" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full border-0 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 dark:text-slate-100"
                />
              </div>
            </label>
          )}

          {statusMessage && <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">{statusMessage}</div>}
          {!isSupabaseConfigured && (
            <div className="rounded-3xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              Supabase needs real project values before login, registration, and password reset can work.
            </div>
          )}
          {errorMessage && <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-200">{errorMessage}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-3xl bg-sky-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {mode === 'login' ? 'Sign in now' : mode === 'register' ? 'Create account' : 'Send reset link'}
          </button>

          <div className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            {mode !== 'reset' && (
              <button
                type="button"
                className="text-sky-600 transition hover:text-sky-700"
                onClick={() => {
                  setMode('reset');
                  setErrorMessage('');
                  setStatusMessage('');
                }}
              >
                Forgot password?
              </button>
            )}
            <button
              type="button"
              className="font-semibold text-slate-900 transition hover:text-slate-700 dark:text-slate-100"
              onClick={() => {
                setErrorMessage('');
                setStatusMessage('');
                setMode(mode === 'login' ? 'register' : 'login');
              }}
            >
              {mode === 'login'
                ? 'Create new account'
                : mode === 'register'
                ? 'Already have an account?'
                : 'Back to login'}
            </button>
          </div>
        </div>
      </form>

      <div className="rounded-[2rem] border border-slate-200 bg-slate-100 px-8 py-8 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Secure authentication</p>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">Built with Firebase Authentication</h2>
        <p className="mt-4 max-w-2xl leading-7">ISA Learn includes a clean login experience with password reset workflow design, ready for Firebase Authentication integration and secure student account management.</p>
      </div>

    </div>
  );
}

export default Auth;
