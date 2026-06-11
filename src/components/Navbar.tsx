import { Link, NavLink } from 'react-router-dom';
import { Bell, BookOpen, Home, LayoutDashboard, ShieldCheck } from 'lucide-react';

type NavbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleNotifications: () => void;
};

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Subjects', path: '/subjects', icon: BookOpen },
  { label: 'Premium', path: '/premium', icon: ShieldCheck },
];

function Navbar({ darkMode, onToggleDarkMode, onToggleNotifications }: NavbarProps) {
  return (
    <header className="border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="layout flex flex-wrap items-center justify-between gap-4 py-5">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-500/20">IS</span>
          <span>ISA Learn</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" onClick={onToggleNotifications} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            <Bell className="h-5 w-5" />
          </button>
          <button type="button" onClick={onToggleDarkMode} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

function SunIcon() {
  return <span className="block h-4 w-4 rounded-full bg-yellow-400" />;
}

function MoonIcon() {
  return <span className="block h-4 w-4 rounded-full bg-slate-700" />;
}

export default Navbar;
