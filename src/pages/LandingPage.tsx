import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import CountUp from '../components/CountUp';
import CourseCard from './CourseCard';
import FeatureCard from './FeatureCard';
import { featuredCourses, pastQuestionsPreviewGroups, trustedBy } from '../data/landing';

function LandingPage() {
  const [pqQuery, setPqQuery] = useState('');
  const [pqFilter, setPqFilter] = useState<'All' | 'Premium' | 'Online'>('All');

  const grouped = useMemo(() => {
    const q = pqQuery.trim().toLowerCase();
    return pastQuestionsPreviewGroups
      .map((g) => {
        const items = g.items.filter((it) => {
          if (pqFilter === 'Premium' && !it.premium) return false;
          if (pqFilter === 'Online' && it.badge.toLowerCase() !== 'online') return false;
          if (!q) return true;
          return `${g.school} ${g.course} ${g.level} ${g.semester} ${it.title} ${it.badge}`.toLowerCase().includes(q);
        });
        return { ...g, items };
      })
      .filter((g) => g.items.length > 0);
  }, [pqQuery, pqFilter]);

  return (
    <div className="space-y-24 pb-10">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" aria-hidden="true" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden="true" />

        <div className="layout relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-light/70 px-4 py-2 text-sm font-semibold text-brand-dark/90 ring-1 ring-brand-light/50 backdrop-blur dark:bg-brand-dark/10 dark:text-brand-light">
              <CheckCircle2 className="h-4 w-4 text-brand-dark" />
              Trusted by thousands of students in Ghana
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-[3.3rem] dark:text-white">
                Study Smarter. Score Higher.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                Access past questions, AI-powered study tools, quizzes, notes, and learning resources—all in one place.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/past-questions"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
              >
                Browse Past Questions
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Students
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  <CountUp to={18900} className="font-semibold" suffix="+" />
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Past Questions
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  <CountUp to={1260} className="font-semibold" suffix="+" />
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  AI Tutor
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  <CountUp to={8400} className="font-semibold" suffix="+" />
                </p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="rounded-[2rem] bg-white/70 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur dark:bg-slate-950/60 dark:shadow-black/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                    AI Study Dashboard
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">82%</p>
                </div>
                <div className="rounded-2xl bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                  Focus
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Smart Recommendations</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Next best topic for today</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      Recommended
                    </span>
                  </div>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <button className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
                    <span>Mock exams</span>
                    <GraduationCap className="h-4 w-4 text-blue-600 transition group-hover:translate-x-0.5" />
                  </button>
                  <button className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
                    <span>Past questions</span>
                    <BookOpen className="h-4 w-4 text-emerald-600 transition group-hover:translate-x-0.5" />
                  </button>
                  <button className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
                    <span>Practice quizzes</span>
                    <Brain className="h-4 w-4 text-violet-600 transition group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Timed Practice</p>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
                    Build speed with exam-style questions.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-emerald-600" />
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Progress Tracking</p>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
                    Know what to revise next.
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-blue-600/10 blur-2xl" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section>
        <div className="layout">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Trusted By
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                Students trust ISA Learn with their exam prep
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Secure & privacy-first
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {trustedBy.map((card) => (
              <div
                key={card.title}
                className="group rounded-[1.25rem] border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/10 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20">
                    <span className="text-lg">{card.icon}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.description}</p>
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section>
        <div className="layout">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Why choose</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                An edtech platform built for real learning outcomes
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <FeatureCard
              icon={Sparkles}
              title="AI Study Assistant"
              description="Turn tough topics into step-by-step explanations—right when you need them."
            />
            <FeatureCard
              icon={BookOpen}
              title="Past Questions Library"
              description="Organized by school, course, level, and semester so you can find answers fast."
            />
            <FeatureCard
              icon={Zap}
              title="Smart Quiz Generator"
              description="Practice with exam-style quizzes that help you build speed and accuracy."
            />
            <FeatureCard
              icon={LineChart}
              title="Personalized Learning Dashboard"
              description="Track progress and get recommendations for what to study next."
            />
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section>
        <div className="layout">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Featured Courses
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                Curated learning tracks for every exam season
              </h2>
            </div>
            <Link to="/subjects" className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Browse all courses →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredCourses.map((c) => (
              <CourseCard
                key={c.id}
                title={c.title}
                description={c.description}
                difficulty={c.difficulty}
                duration={c.duration}
                thumbnailAlt={c.title}
                onContinue={() => {
                  // Keep it simple: reuse existing route pattern
                  // Users can continue by visiting the dashboard.
                  window.location.href = '/dashboard';
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Past Questions Preview */}
      <section>
        <div className="layout">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Past Questions Preview
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                Find papers by school, course, level & semester
              </h2>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <label className="w-full max-w-md">
                <span className="sr-only">Search past questions</span>
                <input
                  value={pqQuery}
                  onChange={(e) => setPqQuery(e.target.value)}
                  placeholder="Search papers, courses, levels..."
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/60 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setPqFilter((prev) => (prev === 'All' ? 'Premium' : prev === 'Premium' ? 'Online' : 'All'));
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                aria-label="Toggle past question filters"
              >
                Filter: {pqFilter}
                <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {grouped.map((g) => (
              <div
                key={`${g.school}-${g.course}-${g.level}-${g.semester}`}
                className="rounded-[1.5rem] border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/45"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                      {g.school} • {g.course}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {g.level} — {g.semester}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-xs font-semibold text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
                    <GraduationCap className="h-4 w-4" />
                    {g.items.length} items
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {g.items.map((it) => (
                    <button
                      key={it.title}
                      type="button"
                      className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40"
                    >
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{it.title}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {it.badge}
                          </span>
                          {it.premium && (
                            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-slate-400 transition group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {grouped.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/60 p-8 text-center dark:border-slate-700 dark:bg-slate-950/40">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No results found.</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try a different search or filter.</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/past-questions"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            >
              Open Past Questions Library
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="layout">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Student Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">What learners say</h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                name: 'Abena Osei',
                school: 'SHS Student',
                quote:
                  'ISA Learn helped me master exam topics quickly and build confidence for my final papers.',
                avatar: 'AO',
              },
              {
                name: 'Kwesi Mensah',
                school: 'CTVET Learner',
                quote:
                  'The mock exams are structured like the real thing, and the instant grading is a game changer.',
                avatar: 'KM',
              },
              {
                name: 'Efia Asante',
                school: 'Tertiary Student',
                quote:
                  'I love how easy it is to find notes, past questions, and curated study tracks in one place.',
                avatar: 'EA',
              },
            ].map((t) => (
              <article
                key={t.name}
                className="group rounded-[1.5rem] border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950/45"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-sm font-semibold text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.school}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200">“{t.quote}”</p>
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 opacity-0 transition group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <div className="layout">
          <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-emerald-500 p-[1px] shadow-2xl shadow-blue-500/20">
            <div className="rounded-[2rem] bg-white/80 p-8 backdrop-blur dark:bg-slate-950/55">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700 dark:text-blue-300">
                    Statistics
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                    Real numbers. Real progress.
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  Built to keep learners moving
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Students</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                    <CountUp to={18900} suffix="+" className="" />
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Courses</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                    <CountUp to={8} suffix="" />
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Past Questions</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                    <CountUp to={1260} suffix="+" />
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">AI Questions Answered</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                    <CountUp to={24000} suffix="+" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="layout">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/45">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-2xl" aria-hidden="true" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-2xl" aria-hidden="true" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                  Get started
                </p>
                <h2 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">Start Learning Today.</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Create a free account and unlock your personalized study plan, past questions, AI explanations, and practice quizzes.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                >
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/past-questions"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                >
                  See Samples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

