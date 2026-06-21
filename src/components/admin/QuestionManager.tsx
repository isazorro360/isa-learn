import { useEffect, useState } from 'react';
import { fetchPastQuestions, deletePastQuestion } from '../../services/firestore';

export default function QuestionManager() {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const data = await fetchPastQuestions();
    setQuestions(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resource?')) return;

    await deletePastQuestion(id);
    loadQuestions();
  };

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Subject</th>
            <th className="p-4 text-left">Year</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {questions.map((q) => (
            <tr key={q.id} className="border-b">
              <td className="p-4">{q.title}</td>
              <td className="p-4">{q.subject}</td>
              <td className="p-4">{q.year}</td>
              <td className="p-4">{q.category}</td>

              <td className="p-4">
                <a
                  href={q.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mr-3 text-sky-600"
                >
                  View
                </a>

                <button
                  onClick={() => handleDelete(q.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}