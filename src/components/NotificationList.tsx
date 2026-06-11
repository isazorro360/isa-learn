import type { Notification } from '../types';

type NotificationListProps = {
  notifications: Notification[];
  onClose: () => void;
};

function NotificationList({ notifications, onClose }: NotificationListProps) {
  return (
    <div className="absolute right-6 top-28 z-50 w-full max-w-sm rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-500/10 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Latest activity and updates.</p>
        </div>
        <button type="button" onClick={onClose} className="text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          Close
        </button>
      </div>
      <div className="space-y-3 p-5">
        {notifications.map((item) => (
          <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationList;
