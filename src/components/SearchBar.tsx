import { Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { subjects, resources } from '../data';
import type { Subject, Resource } from '../types';

type SearchBarProps = {
  onSearch?: (query: string) => void;
  onSelectResult?: (result: any) => void;
};

type SearchResults = {
  subjects: Subject[];
  resources: Resource[];
};

function SearchBar({ onSearch, onSelectResult }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results: SearchResults = useMemo(() => {
    if (!query.trim()) return { subjects: [], resources: [] };

    const lowerQuery = query.toLowerCase();
    const subjectMatches = subjects.filter((s) => s.title.toLowerCase().includes(lowerQuery));
    const resourceMatches = resources.filter(
      (r) => r.title.toLowerCase().includes(lowerQuery) || r.description.toLowerCase().includes(lowerQuery),
    );

    return {
      subjects: subjectMatches.slice(0, 3),
      resources: resourceMatches.slice(0, 5),
    };
  }, [query]);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-950">
        <Search className="h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search subjects, notes, past questions..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full border-0 bg-transparent outline-none text-slate-900 placeholder:text-slate-500 dark:text-slate-100"
        />
        {query && (
          <button onClick={() => { setQuery(''); setIsOpen(false); }} className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && query && results.subjects.length + results.resources.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
          <div className="max-h-96 overflow-y-auto p-4">
            {results.subjects.length > 0 && (
              <div className="mb-4">
                <p className="px-3 text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Subjects</p>
                <div className="mt-2 space-y-2">
                  {results.subjects.map((subject: Subject) => (
                    <button
                      key={subject.id}
                      onClick={() => {
                        onSelectResult?.(subject);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="block w-full rounded-2xl bg-slate-50 p-3 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                    >
                      {subject.icon} {subject.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.resources.length > 0 && (
              <div>
                <p className="px-3 text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Resources</p>
                <div className="mt-2 space-y-2">
                  {results.resources.map((resource: Resource) => (
                    <button
                      key={resource.id}
                      onClick={() => {
                        onSelectResult?.(resource);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="block w-full rounded-2xl bg-slate-50 p-3 text-left transition hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{resource.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{resource.type} • {resource.subject}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && query && results.subjects.length + results.resources.length === 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
