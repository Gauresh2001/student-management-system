import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StudentForm from '../components/students/StudentForm';
import { createStudent } from '../api/studentService';
import { STUDENT_FORM_DEFAULTS } from '../utils/validateStudent';

export default function AddStudentPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const student = await createStudent(values);
      navigate(`/students/${student.id}`, { state: { justCreated: true } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <button
        type="button"
        onClick={() => navigate('/students')}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Students
      </button>

      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Add Student</h2>
      <p className="mb-5 text-sm text-slate-400 dark:text-slate-500">Fill in the details below to enroll a new student.</p>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <StudentForm
          initialValues={STUDENT_FORM_DEFAULTS}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Add Student"
          onCancel={() => navigate('/students')}
        />
      </div>
    </div>
  );
}
