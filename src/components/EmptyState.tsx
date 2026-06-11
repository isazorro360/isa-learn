function EmptyState({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-8 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
      <div className="text-6xl">{icon}</div>
      <h3 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}

export default EmptyState;
