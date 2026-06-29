import { Search, X } from 'lucide-react';
import Select from '../ui/Select';
import { CLASS_OPTIONS, SECTION_OPTIONS, STATUS_OPTIONS } from '../../data/mockStudents';

export default function StudentFilters({
  search,
  onSearchChange,
  classFilter,
  onClassChange,
  sectionFilter,
  onSectionChange,
  statusFilter,
  onStatusChange,
  onClear,
}) {
  const hasActiveFilters = search || classFilter || sectionFilter || statusFilter;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 sm:min-w-[220px] sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name, roll no, or email"
          className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:flex sm:w-auto">
        <Select value={classFilter} onChange={(event) => onClassChange(event.target.value)} className="sm:w-32">
          <option value="">Class</option>
          {CLASS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              Class {option}
            </option>
          ))}
        </Select>

        <Select value={sectionFilter} onChange={(event) => onSectionChange(event.target.value)} className="sm:w-32">
          <option value="">Section</option>
          {SECTION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              Section {option}
            </option>
          ))}
        </Select>

        <Select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)} className="sm:w-32">
          <option value="">Status</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 self-start text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <X className="h-3.5 w-3.5" />
          Clear filters
        </button>
      )}
    </div>
  );
}
