import { ArrowRight, Clock3, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import SubjectCard from '../components/SubjectCard';
import useAuth from '../hooks/useAuth';
import { achievements, subjects } from '../data';

function Dashboard() {
  const { isAdmin, profile } = useAuth();

  return (
    <div className="layout space-y-10">
      {isAdmin && (
        <section className="rounded-[2rem] border border-sky-200 bg-sky-50 p-8 shadow-sm dark:border-sky-900 dark:bg-sky-950/30">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Admin access</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Upload new exam resources</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                As an admin, you can add past questions, marking schemes, and notes directly from the dashboard.
              </p>
            </div>
            <Link
              to="/admin/uploads"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Upload past questions
            </Link>
          </div>
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Welcome back</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{profile?.displayName || 'Scholar'}, ready for your next success?</h2>
            </div>
            <div className="rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Student Dashboard
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-sky-600 px-6 py-7 text-white shadow-2xl shadow-sky-500/20">
              <p className="text-sm uppercase tracking-[0.24em]">Today's focus</p>
              <p className="mt-4 text-3xl font-semibold">Mock exam revision</p>
              <p className="mt-3 text-sm leading-6 text-sky-100/90">Finish 3 timed quizzes and review Mathematics and English notes.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Progress tracker</p>
              <div className="mt-4 flex items-end justify-between gap-5">
                <div>
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">74%</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Complete study targets</p>
                </div>
                <div className="rounded-3xl bg-slate-800 px-4 py-2 text-sm text-white">+14% this month</div>
              </div>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full w-[74%] rounded-full bg-sky-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <DashboardCard title="Saved" value="12" description="Resources bookmarked for quick review." accent="bg-sky-600" />
          <DashboardCard title="Streak" value="5 days" description="Continuous learning streak this week." accent="bg-emerald-600" />
          <DashboardCard title="Rank" value="#9" description="Top learners leaderboard position." accent="bg-violet-600" />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Recently viewed</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Continue where you left off</h3>
            </div>
            <button className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">See all</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Mathematics</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Exam formulas and solved questions.</p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>50% complete</span>
                <span>2h 20m</span>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">English Language</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Reading passage exercises and summaries.</p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>28% complete</span>
                <span>1h 10m</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Achievements</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Badges earned</h3>
            </div>
            <Heart className="h-6 w-6 text-rose-500" />
          </div>
          <div className="space-y-4">
            {achievements.map((key) => (
              <div key={key.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{key.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{key.description}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{key.progress}%</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-sky-600" style={{ width: `${key.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
            View progress <ArrowRight className="h-4 w-4" />
          </button>
        </aside>
      </section>

      <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Recommended</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Subjects to boost your exam score</h3>
          </div>
          <button className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Explore all</button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {subjects.slice(0, 4).map((subject) => (
            <SubjectCard key={subject.title} {...subject} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
