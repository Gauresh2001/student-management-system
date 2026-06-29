import { Loader2 } from 'lucide-react';

export default function Spinner({ label = 'Loading...', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 py-16 text-slate-400 ${className}`}>
      <Loader2 className="h-7 w-7 animate-spin text-indigo-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
