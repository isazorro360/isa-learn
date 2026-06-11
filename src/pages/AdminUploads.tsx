import { CloudUpload, FileText, Loader2, Upload } from 'lucide-react';
import { FormEvent, DragEvent, useState } from 'react';
import { addPastQuestionToFirestore } from '../services/firestore';
import { uploadPastQuestionPdf } from '../services/storage';
import useAuth from '../hooks/useAuth';

const subjectOptions = [
  'Mathematics',
  'Biology',
  'Chemistry',
  'English',
  'Physics',
  'Government',
];

const categoryOptions = ['Past Question', 'Marking Scheme', 'Notes'];
const yearOptions = [2022, 2023, 2024, 2025, 2026];

function AdminUploads() {
  const { user, loading, isAdmin } = useAuth();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(subjectOptions[0]);
  const [year, setYear] = useState(yearOptions[2]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle('');
    setSubject(subjectOptions[0]);
    setYear(yearOptions[2]);
    setCategory(categoryOptions[0]);
    setDescription('');
    setFile(null);
    setUploadProgress(0);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatusMessage('');
    setErrorMessage('');

    if (!user) {
      setErrorMessage('Please sign in as an admin to upload documents.');
      return;
    }

    if (!isAdmin) {
      setErrorMessage('You must be an admin to upload past questions.');
      return;
    }

    if (!title || !description || !file) {
      setErrorMessage('Please complete every field and upload a PDF file.');
      return;
    }

    if (file.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are supported.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { downloadUrl, fileName } = await uploadPastQuestionPdf(file, subject, year, setUploadProgress);
      await addPastQuestionToFirestore({
        title,
        subject,
        year,
        category: category as 'Past Question' | 'Marking Scheme' | 'Notes',
        description,
        fileName,
        fileUrl: downloadUrl,
        uploadedBy: user.email || 'admin',
      });

      setStatusMessage('Document uploaded successfully.');
      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage('Upload failed. Please try again or check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="layout mx-auto py-16 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-sky-600" />
        <p className="mt-6 text-slate-600 dark:text-slate-300">Checking admin access…</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="layout mx-auto rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-2xl text-center">
          <CloudUpload className="mx-auto h-12 w-12 text-sky-600" />
          <h1 className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">Admin upload access</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Only authenticated admins can upload past questions and marking schemes. Please sign in with your admin account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="layout space-y-8 pb-20">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Admin uploads</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Upload past questions and docs</h1>
          </div>
          <div className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            Signed in as {user.email}
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Document title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: November 2025 Mathematics"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</span>
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              {subjectOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Year</span>
            <select
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              {yearOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">File upload</span>
            <div
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
              className="mt-3 flex min-h-[160px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-slate-500 transition hover:border-sky-500 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400"
            >
              <Upload className="mb-3 h-6 w-6 text-sky-600" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Drag & drop PDF or choose file</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Only PDF files are allowed.</p>
              {file && <p className="mt-3 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{file.name}</p>}
            </div>
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            placeholder="Add a summary to help students find this resource"
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </label>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {statusMessage && <p className="text-sm text-emerald-600">{statusMessage}</p>}
            {errorMessage && <p className="text-sm text-rose-600">{errorMessage}</p>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="min-w-[200px] rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
              Upload progress: {uploadProgress}%
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-3xl bg-sky-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <CloudUpload className="h-5 w-5" />}
              Upload resource
            </button>
          </div>
        </div>
      </form>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-100 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <FileText className="h-5 w-5 text-sky-600" />
          <p>Files are stored to Firebase Storage and indexed in Firestore for fast student access.</p>
        </div>
      </section>
    </div>
  );
}

export default AdminUploads;
