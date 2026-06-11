import { PropsWithChildren } from 'react';
import { Loader2 } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function LoadingScreen() {
  return (
    <div className="layout py-24 text-center">
      <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-sky-600" />
      <p className="text-slate-600 dark:text-slate-300">Checking access…</p>
    </div>
  );
}

export function AuthGuard({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function AdminGuard({ children }: PropsWithChildren) {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
