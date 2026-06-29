import { ChevronDown } from 'lucide-react';

export default function Select({ invalid, className = '', children, ...props }) {
  return (
    <div className="relative">
      <select
        className={`block w-full appearance-none rounded-lg border bg-white px-2.5 py-2 pr-7 text-xs text-slate-800 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 dark:bg-slate-800 dark:text-slate-100 sm:px-3 sm:pr-9 sm:text-sm ${
          invalid
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-900'
            : 'border-slate-300 focus:border-indigo-400 focus:ring-indigo-100 dark:border-slate-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-900'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500 sm:right-3 sm:h-4 sm:w-4" />
    </div>
  );
}
