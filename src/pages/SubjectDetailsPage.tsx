import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ArrowLeft, Filter } from 'lucide-react';
import { subjects, resources } from '../data';
import ResourceCard from '../components/ResourceCard';
import PremiumUpgradeModal from '../components/PremiumUpgradeModal';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';

function SubjectDetailsPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isPremiumUser] = useState(false);
  const [isLoading] = useState(false);

  const subject = subjects.find((s) => s.id === subjectId);
  const subjectResources = resources.filter((r) => r.subject === subject?.title);

  const filteredResources = useMemo(() => {
    return subjectResources.filter((r) => {
      if (selectedType && r.type !== selectedType) return false;
      if (selectedYear && r.year.toString() !== selectedYear) return false;
      return true;
    });
  }, [selectedType, selectedYear]);

  const resourceTypes = Array.from(new Set(subjectResources.map((r) => r.type)));
  const years = Array.from(new Set(subjectResources.map((r) => r.year))).sort((a, b) => b - a);

  if (!subject) {
    return (
      <div className="layout py-10">
        <EmptyState title="Subject not found" description="This subject does not exist." icon="❌" />
      </div>
    );
  }

  return (
    <div className="layout space-y-10 pb-24 md:pb-10">
      <button onClick={() => navigate('/subjects')} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to subjects
      </button>

      <section className={`rounded-[2rem] bg-gradient-to-br ${subject.color} p-12 text-white shadow-xl`}>
        <div className="text-5xl">{subject.icon}</div>
        <h1 className="mt-6 text-4xl font-semibold">{subject.title}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-white/90">{subject.description}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">Total resources</p>
            <p className="mt-2 text-3xl font-semibold">{subject.resources}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">Difficulty</p>
            <p className="mt-2 text-3xl font-semibold">{subject.difficulty}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">Students enrolled</p>
            <p className="mt-2 text-3xl font-semibold">3,420</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Resources</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{filteredResources.length} results</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-700 dark:text-slate-300">Resource type</p>
            <div className="mt-3 space-y-2">
              <button
                onClick={() => setSelectedType('')}
                className={`block w-full rounded-2xl px-4 py-2 text-left text-sm font-semibold transition ${
                  selectedType === '' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                All types
              </button>
              {resourceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`block w-full rounded-2xl px-4 py-2 text-left text-sm font-semibold transition ${
                    selectedType === type ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-700 dark:text-slate-300">Year</p>
            <div className="mt-3 space-y-2">
              <button
                onClick={() => setSelectedYear('')}
                className={`block w-full rounded-2xl px-4 py-2 text-left text-sm font-semibold transition ${
                  selectedYear === '' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                All years
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year.toString())}
                  className={`block w-full rounded-2xl px-4 py-2 text-left text-sm font-semibold transition ${
                    selectedYear === year.toString() ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <SkeletonLoader variant="resource" count={4} />
      ) : filteredResources.length > 0 ? (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              {...resource}
              isPremiumUser={isPremiumUser}
              onViewClick={() => {
                if (resource.premium && !isPremiumUser) {
                  setShowPremiumModal(true);
                }
              }}
              onDownloadClick={() => {
                if (resource.premium && !isPremiumUser) {
                  setShowPremiumModal(true);
                }
              }}
            />
          ))}
        </section>
      ) : (
        <EmptyState title="No resources found" description="Try adjusting your filters or browse other subjects." icon="📋" />
      )}

      {showPremiumModal && (
        <PremiumUpgradeModal
          resourceTitle="This Premium Resource"
          onClose={() => setShowPremiumModal(false)}
          onUpgrade={() => navigate('/premium')}
        />
      )}
    </div>
  );
}

export default SubjectDetailsPage;
