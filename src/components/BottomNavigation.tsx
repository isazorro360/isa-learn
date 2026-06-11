import { BookOpen, Home, Menu, Search, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function BottomNavigation() {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  const mainItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BookOpen, label: 'Subjects', path: '/subjects' },
    { icon: Search, label: 'Resources', path: '/resources' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const moreItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Notes', path: '/notes' },
    { label: 'Past Questions', path: '/past-questions' },
    { label: 'Mock Exams', path: '/mock-exams' },
    { label: 'Saved Resources', path: '/saved-resources' },
    { label: 'Premium', path: '/premium' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
      <div className="flex items-center justify-between gap-1 px-2 py-3">
        {mainItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 transition ${
                isActive ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/20 dark:text-sky-200' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          );
        })}
        <div className="relative flex-1">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs font-semibold">More</span>
          </button>
          {showMore && (
            <div className="absolute bottom-full right-0 mb-2 w-48 rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
              {moreItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMore(false)}
                  className="block border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 last:border-b-0 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BottomNavigation;
