import { ChevronLeft, ChevronRight } from 'lucide-react';

function getPageNumbers(current, totalPages) {
  const pages = new Set([1, totalPages, current, current - 1, current + 1]);
  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export default function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  if (totalItems === 0) return null;

  const pageNumbers = getPageNumbers(page, totalPages);
  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 dark:border-slate-700 sm:flex-row sm:px-6">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing <span className="font-medium text-slate-700 dark:text-slate-200">{rangeStart}</span>–
        <span className="font-medium text-slate-700 dark:text-slate-200">{rangeEnd}</span> of{' '}
        <span className="font-medium text-slate-700 dark:text-slate-200">{totalItems}</span> students
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pageNumbers.map((num, idx) => {
          const prev = pageNumbers[idx - 1];
          const showGap = prev !== undefined && num - prev > 1;
          return (
            <span key={num} className="flex items-center">
              {showGap && <span className="px-1.5 text-sm text-slate-400 dark:text-slate-500">…</span>}
              <button
                type="button"
                onClick={() => onPageChange(num)}
                className={`h-8 min-w-8 rounded-md px-2.5 text-sm font-medium transition-colors ${
                  num === page
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {num}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
