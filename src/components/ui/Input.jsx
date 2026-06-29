export default function Input({ invalid, className = '', ...props }) {
  return (
    <input
      className={`block w-full rounded-lg border px-3 py-2 text-sm text-slate-800 shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
        invalid
          ? 'border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-900'
          : 'border-slate-300 focus:border-indigo-400 focus:ring-indigo-100 dark:border-slate-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-900'
      } ${className}`}
      {...props}
    />
  );
}
