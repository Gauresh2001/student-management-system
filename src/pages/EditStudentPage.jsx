import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StudentForm from '../components/students/StudentForm';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { getStudentById, updateStudent } from '../api/studentService';
import { STUDENT_FORM_DEFAULTS } from '../utils/validateStudent';

export default function EditStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    getStudentById(id).then((result) => {
      if (active) {
        setStudent(result);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await updateStudent(id, values);
      navigate(`/students/${id}`, { state: { justUpdated: true } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <Spinner label="Loading student details..." />
        </div>
      )}

      {!isLoading && !student && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <EmptyState
            title="Student not found"
            message="This student record may have been deleted."
            action={<Button size="sm" onClick={() => navigate('/students')}>Back to Students</Button>}
          />
        </div>
      )}

      {!isLoading && student && (
        <>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Edit Student</h2>
          <p className="mb-5 text-sm text-slate-400 dark:text-slate-500">
            Update details for {student.fullName} ({student.id}).
          </p>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <StudentForm
              initialValues={{ ...STUDENT_FORM_DEFAULTS, ...student }}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitLabel="Save Changes"
              onCancel={() => navigate(-1)}
            />
          </div>
        </>
      )}
    </div>
  );
}
