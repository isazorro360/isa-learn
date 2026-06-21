import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPastQuestions } from '../services/firestore';

export default function SubjectResources() {
  const { subject } = useParams();

  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    loadResources();
  }, [subject]);

  const loadResources = async () => {
    const data = await fetchPastQuestions({
      subject: subject || ''
    });

    setResources(data);
  };

  return (
    <div className="layout py-10">
      <h1 className="mb-8 text-3xl font-bold">
        {subject}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold">
              {resource.title}
            </h3>

            <p className="mt-2 text-sm">
              {resource.description}
            </p>

            <div className="mt-4 text-sm">
              {resource.year}
            </div>

            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-xl bg-sky-600 px-4 py-2 text-white"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}