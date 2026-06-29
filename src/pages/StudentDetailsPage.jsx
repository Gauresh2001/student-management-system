import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Mail, Phone, MapPin, Cake, Droplet, Calendar, UserRound } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import Modal from '../components/ui/Modal';
import StatusBadge from '../components/students/StatusBadge';
import { getStudentById, deleteStudent } from '../api/studentService';

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{value || '—'}</p>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-white">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export default function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteStudent(id);
      navigate('/students');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <Spinner label="Loading student details..." />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <EmptyState
          title="Student not found"
          message="This student record may have been deleted or never existed."
          action={<Button size="sm" onClick={() => navigate('/students')}>Back to Students</Button>}
        />
      </div>
    );
  }

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

      <div className="mb-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={student.fullName} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{student.fullName}</h2>
              <StatusBadge status={student.status} />
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {student.id} · Roll No. {student.rollNo} · Class {student.class}-{student.section}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate(`/students/${id}/edit`)}>
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="danger" onClick={() => setConfirmDelete(true)}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        <Card title="Personal Information">
          <InfoRow icon={Cake} label="Date of Birth" value={student.dob} />
          <InfoRow icon={UserRound} label="Gender" value={student.gender} />
          <InfoRow icon={Droplet} label="Blood Group" value={student.bloodGroup} />
        </Card>

        <Card title="Academic Information">
          <InfoRow icon={Calendar} label="Admission Date" value={student.admissionDate} />
          <InfoRow icon={UserRound} label="Class & Section" value={`Class ${student.class} - ${student.section}`} />
        </Card>

        <Card title="Contact Information">
          <InfoRow icon={Mail} label="Email" value={student.email} />
          <InfoRow icon={Phone} label="Phone" value={student.phone} />
          <div className="sm:col-span-2">
            <InfoRow icon={MapPin} label="Address" value={student.address} />
          </div>
        </Card>

        <Card title="Guardian Information">
          <InfoRow icon={UserRound} label="Guardian's Name" value={student.guardianName} />
          <InfoRow icon={UserRound} label="Relation" value={student.guardianRelation} />
          <InfoRow icon={Phone} label="Guardian's Phone" value={student.guardianPhone} />
        </Card>
      </div>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete student">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <span className="font-medium text-slate-800 dark:text-white">{student.fullName}</span>?
          This action cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDelete(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
