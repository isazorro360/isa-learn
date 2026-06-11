import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { resources, subjects } from '../data';
import ResourceCard from '../components/ResourceCard';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';

function ResourcesListPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPremiumUser] = useState(false);

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      if (selectedSubject && r.subject !== selectedSubject) return false;
      if (selectedType && r.type !== selectedType) return false;
      if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase()) && !r.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [selectedSubject, selectedType, searchQuery]);

  const resourceTypes = Array.from(new Set(resources.map((r) => r.type)));

  return (
    <div className="layout space-y-10 pb-24 md:pb-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Resources</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Browse all resources</h1>
          </div>
          <SearchBar onSearch={(q) => setSearchQuery(q)} />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_3fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Filters</h3>
              <Filter className="h-4 w-4 text-slate-500" />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:text-slate-400">Subject</p>
                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => setSelectedSubject('')}
                    className={`block w-full rounded-2xl px-4 py-2 text-left text-sm font-semibold transition ${
                      selectedSubject === '' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    All subjects
                  </button>
                  {subjects.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.title)}
                      className={`block w-full rounded-2xl px-4 py-2 text-left text-sm font-semibold transition ${
                        selectedSubject === subject.title ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {subject.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:text-slate-400">Type</p>
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
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredResources.length}</span> resources
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} isPremiumUser={isPremiumUser} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ResourcesListPage;
