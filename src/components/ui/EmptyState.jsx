import { UserSearch } from 'lucide-react';

export default function EmptyState({
  icon: Icon = UserSearch,
  title = 'No results found',
  message = 'Try adjusting your search or filters.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <Icon className="h-7 w-7 text-slate-400" />
      </div>
      <div>
        <p className="font-medium text-slate-700">{title}</p>
        <p className="mt-1 text-sm text-slate-400">{message}</p>
      </div>
      {action}
    </div>
  );
}
