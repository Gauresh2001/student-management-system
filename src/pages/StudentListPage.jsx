import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import StudentFilters from '../components/students/StudentFilters';
import StudentTable from '../components/students/StudentTable';
import { useStudents } from '../hooks/useStudents';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { deleteStudent } from '../api/studentService';

export default function StudentListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 300);

  const { students, total, pageSize, isLoading, error, refetch } = useStudents({
    search: debouncedSearch,
    classFilter,
    sectionFilter,
    statusFilter,
    page,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, classFilter, sectionFilter, statusFilter]);

  const handleClearFilters = () => {
    setSearch('');
    setClassFilter('');
    setSectionFilter('');
    setStatusFilter('');
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    setIsDeleting(true);
    try {
      await deleteStudent(studentToDelete.id);
      setStudentToDelete(null);
      refetch();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Students</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500">Manage student records, classes, and details.</p>
        </div>
        <Button onClick={() => navigate('/students/new')}>
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-200 p-4 dark:border-slate-700">
          <StudentFilters
            search={search}
            onSearchChange={setSearch}
            classFilter={classFilter}
            onClassChange={setClassFilter}
            sectionFilter={sectionFilter}
            onSectionChange={setSectionFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onClear={handleClearFilters}
          />
        </div>

        {isLoading && <Spinner label="Loading students..." />}

        {!isLoading && error && (
          <EmptyState
            icon={Users}
            title="Something went wrong"
            message={error}
            action={
              <Button variant="secondary" size="sm" onClick={refetch}>
                Try again
              </Button>
            }
          />
        )}

        {!isLoading && !error && students.length === 0 && (
          <EmptyState
            icon={Users}
            title="No students found"
            message="Try adjusting your search or filters, or add a new student."
            action={
              <Button size="sm" onClick={() => navigate('/students/new')}>
                <Plus className="h-4 w-4" />
                Add Student
              </Button>
            }
          />
        )}

        {!isLoading && !error && students.length > 0 && (
          <>
            <StudentTable students={students} onDelete={setStudentToDelete} />
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={total}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      <Modal open={Boolean(studentToDelete)} onClose={() => setStudentToDelete(null)} title="Delete student">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete{' '}
          <span className="font-medium text-slate-800 dark:text-white">{studentToDelete?.fullName}</span>? This action cannot be
          undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setStudentToDelete(null)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
