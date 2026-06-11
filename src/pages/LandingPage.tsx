import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, LayoutDashboard, Search } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import SubjectCard from '../components/SubjectCard';
import TestimonialCard from '../components/TestimonialCard';
import { subjects, stats, testimonials } from '../data';

function LandingPage() {
  return (
    <section className="layout space-y-16 py-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-900/20 dark:text-sky-200">
            <CheckCircle2 className="h-4 w-4" />
            Trusted by thousands of students in Ghana
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
            Learn Smarter. Pass Exams. Succeed.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            ISA Learn brings SHS, CTVET, and tertiary study resources together in one polished platform—notes, mock exams, past questions, and premium guidance for every exam season.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/dashboard" className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
              Get Started
            </Link>
            <Link to="/subjects" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              Browse Subjects
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatsCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/40 dark:bg-slate-900 dark:shadow-black/20">
          <div className="grid gap-6">
            <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Study progress</h2>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">82%</p>
                </div>
                <div className="rounded-3xl bg-sky-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">Focus</div>
              </div>
              <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-sky-500 to-cyan-500" />
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Quick access</h3>
              <div className="mt-5 grid gap-3">
                <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
                  <span>Mock exams</span>
                  <Search className="h-4 w-4" />
                </button>
                <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
                  <span>Past questions</span>
                  <BookOpen className="h-4 w-4" />
                </button>
                <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
                  <span>New resources</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-600">Featured subjects</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Explore top study streams</h2>
          </div>
          <Link to="/subjects" className="text-sm font-semibold text-sky-600 transition hover:text-sky-700">
            View all subjects →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {subjects.slice(0, 4).map((subject) => (
            <SubjectCard key={subject.title} {...subject} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Student success</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Trusted by learners across Ghana</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default LandingPage;
