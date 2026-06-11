import { useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Subjects from './pages/Subjects';
import SubjectDetailsPage from './pages/SubjectDetailsPage';
import Notes from './pages/Notes';
import PastQuestions from './pages/PastQuestions';
import MockExams from './pages/MockExams';
import AdminPanel from './pages/AdminPanel';
import AdminUploads from './pages/AdminUploads';
import Premium from './pages/Premium';
import NotFound from './pages/NotFound';
import SavedResourcesPage from './pages/SavedResourcesPage';
import ResourcesListPage from './pages/ResourcesListPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import BottomNavigation from './components/BottomNavigation';
import { AuthGuard, AdminGuard } from './components/RouteGuard';
import { notifications } from './data';
import NotificationList from './components/NotificationList';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('darkMode', String(newValue));
      return newValue;
    });
  };

  const pageTitle = useMemo(() => {
    if (location.pathname === '/') return 'Home';
    if (location.pathname === '/dashboard') return 'Dashboard';
    if (location.pathname === '/subjects') return 'Subjects';
    if (location.pathname.startsWith('/subject/')) return 'Subject Details';
    if (location.pathname === '/resources') return 'Browse Resources';
    if (location.pathname === '/saved-resources') return 'My Saved Resources';
    if (location.pathname === '/notes') return 'Notes';
    if (location.pathname === '/past-questions') return 'Past Questions';
    if (location.pathname === '/mock-exams') return 'Mock Exams';
    if (location.pathname === '/admin') return 'Admin Panel';
    if (location.pathname === '/admin/uploads') return 'Admin Uploads';
    if (location.pathname === '/premium') return 'Premium';
    if (location.pathname === '/profile') return 'Profile';
    if (location.pathname === '/auth') return 'Authentication';
    return 'ISA Learn';
  }, [location.pathname]);

  const showPageHeader = location.pathname !== '/';

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Navbar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} onToggleNotifications={() => setShowNotifications((value) => !value)} />
        <main className="layout relative">
          {showPageHeader && (
            <div className="flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-sky-600">ISA Learn</p>
                <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{pageTitle}</h1>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                onClick={handleToggleDarkMode}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          )}

          {showNotifications && <NotificationList notifications={notifications} onClose={() => setShowNotifications(false)} />}

          <div className="py-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subject/:subjectId" element={<SubjectDetailsPage />} />
              <Route path="/resources" element={<ResourcesListPage />} />
              <Route path="/saved-resources" element={<AuthGuard><SavedResourcesPage /></AuthGuard>} />
              <Route path="/notes" element={<AuthGuard><Notes /></AuthGuard>} />
              <Route path="/past-questions" element={<AuthGuard><PastQuestions /></AuthGuard>} />
              <Route path="/mock-exams" element={<AuthGuard><MockExams /></AuthGuard>} />
              <Route path="/admin" element={<AdminGuard><AdminPanel /></AdminGuard>} />
              <Route path="/admin/uploads" element={<AdminGuard><AdminUploads /></AdminGuard>} />
              <Route path="/premium" element={<Premium />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <BottomNavigation />
        <Footer />
      </div>
    </div>
  );
}

export default App;
