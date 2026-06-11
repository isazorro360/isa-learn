type StatsCardProps = {
  label: string;
  value: string;
};

function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{label}</p>
      <h3 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{value}</h3>
    </div>
  );
}

export default StatsCard;
