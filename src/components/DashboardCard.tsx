type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  accent: string;
};

function DashboardCard({ title, value, description, accent }: DashboardCardProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white ${accent}`}>{title}</div>
      <div className="mt-6 text-3xl font-semibold text-slate-900 dark:text-white">{value}</div>
      <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}

export default DashboardCard;
