import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="layout grid min-h-[60vh] place-items-center text-center">
      <div className="max-w-xl rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.28em] text-sky-600">404 page</p>
        <h1 className="mt-6 text-5xl font-semibold text-slate-900 dark:text-white">Page not found</h1>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">The route you are looking for does not exist yet. Return to the ISA Learn homepage and continue exploring educational resources.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
          Go home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
