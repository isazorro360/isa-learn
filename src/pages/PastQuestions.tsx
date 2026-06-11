import { useEffect, useMemo, useState } from 'react';
import { Download, FileText, Search } from 'lucide-react';
import BookmarkButton from '../components/BookmarkButton';
import PDFViewer from '../components/PDFViewer';
import { fetchPastQuestions } from '../services/firestore';
import useBookmarks from '../hooks/useBookmarks';
import { PastQuestionDoc } from '../types';

const subjectOptions = ['Mathematics', 'Biology', 'Chemistry', 'English', 'Physics', 'Government'];
const categoryOptions = ['Past Question', 'Marking Scheme', 'Notes'];
const yearOptions = [2022, 2023, 2024, 2025, 2026];

function PastQuestions() {
  const [pastQuestions, setPastQuestions] = useState<PastQuestionDoc[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState<PastQuestionDoc | null>(null);
  const { isBookmarked, toggleBookmark, error: bookmarkError } = useBookmarks();

  const pageSize = 6;

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setError('');

      try {
        const questions = await fetchPastQuestions({
          subject: subjectFilter || undefined,
          year: yearFilter ? Number(yearFilter) : undefined,
          category: categoryFilter || undefined,
        });
        setPastQuestions(questions);
      } catch (err) {
        console.error(err);
        setError('Unable to load past questions right now.');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [subjectFilter, yearFilter, categoryFilter]);

  const filteredQuestions = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return pastQuestions.filter((question) => {
      const matchesSearch = query
        ? question.title.toLowerCase().includes(query) || question.description.toLowerCase().includes(query)
        : true;

      return (
        matchesSearch &&
        (subjectFilter ? question.subject === subjectFilter : true) &&
        (yearFilter ? question.year === Number(yearFilter) : true) &&
        (categoryFilter ? question.category === categoryFilter : true)
      );
    });
  }, [pastQuestions, searchTerm, subjectFilter, yearFilter, categoryFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));
  const paginatedQuestions = filteredQuestions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, subjectFilter, yearFilter, categoryFilter]);

  const handleBookmarkChange = async (resourceId: string, isBookmarkedState: boolean) => {
    const question = pastQuestions.find((item) => item.id === resourceId);
    if (!question || !toggleBookmark) return;

    if (isBookmarkedState) {
      await toggleBookmark({
        resourceId: question.id,
        title: question.title,
        subject: question.subject,
        category: question.category,
        year: question.year,
        description: question.description,
        fileUrl: question.fileUrl,
        fileName: question.fileName,
      });
    } else {
      await toggleBookmark({
        resourceId: question.id,
        title: question.title,
        subject: question.subject,
        category: question.category,
        year: question.year,
        description: question.description,
        fileUrl: question.fileUrl,
        fileName: question.fileName,
      });
    }
  };

  return (
    <div className="layout space-y-8 pb-20">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Past questions</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Search past papers, marking schemes, and notes</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Find exam papers by subject, year, or category. Preview PDFs inline and download them for offline study.
            </p>
          </div>
          <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2 md:max-w-none">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Search</span>
              <div className="mt-3 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by title or description"
                  className="w-full border-0 bg-transparent text-slate-900 outline-none dark:text-slate-100"
                />
              </div>
            </label>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</span>
                <select
                  value={subjectFilter}
                  onChange={(event) => setSubjectFilter(event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="">All subjects</option>
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Year</span>
                <select
                  value={yearFilter}
                  onChange={(event) => setYearFilter(event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="">Any year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</span>
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="">All categories</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      {bookmarkError && (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-center text-rose-700 shadow-sm dark:border-rose-800/40 dark:bg-rose-950/20 dark:text-rose-200">
          {bookmarkError}
        </div>
      )}

      {loading ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-400">Loading available past questions...</p>
        </div>
      ) : error ? (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-center text-rose-700 shadow-sm dark:border-rose-800/40 dark:bg-rose-950/20 dark:text-rose-200">
          {error}
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-400">No past questions matched your filters. Try adjusting the search terms or criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            {paginatedQuestions.map((question) => (
              <article key={question.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-sky-600">{question.category}</p>
                    <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{question.title}</h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{question.description}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                    {question.year}
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span>{question.subject}</span>
                  <span>•</span>
                  <span>Uploaded by {question.uploadedBy}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedQuestion(question)}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    <FileText className="h-4 w-4" />
                    Preview
                  </button>
                  <a
                    href={question.fileUrl}
                    download={question.fileName}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                  <BookmarkButton
                    resourceId={question.id}
                    initialBookmarked={isBookmarked(question.id)}
                    onBookmarkChange={handleBookmarkChange}
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing {paginatedQuestions.length} of {filteredQuestions.length} records
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((cur) => Math.max(cur - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                Previous
              </button>
              <span className="text-sm text-slate-500 dark:text-slate-400">Page {currentPage} of {pageCount}</span>
              <button
                type="button"
                onClick={() => setCurrentPage((cur) => Math.min(cur + 1, pageCount))}
                disabled={currentPage === pageCount}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-6xl">
            <PDFViewer
              pdfUrl={selectedQuestion.fileUrl}
              title={selectedQuestion.title}
              onClose={() => setSelectedQuestion(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PastQuestions;
