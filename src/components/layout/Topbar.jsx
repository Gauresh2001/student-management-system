import { Menu, Sun, Moon } from 'lucide-react';

export default function Topbar({ title, subtitle, onMenuClick, darkMode, onToggleDark }) {
  return (
    <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-900 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1">
        <h1 className="text-base font-semibold text-slate-800 dark:text-white sm:text-lg">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 sm:text-sm">{subtitle}</p>}
      </div>

      <button
        type="button"
        onClick={onToggleDark}
        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </header>
  );
}
