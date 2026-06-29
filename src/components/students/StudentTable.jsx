import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, Mail, Phone } from 'lucide-react';
import Avatar from '../ui/Avatar';
import StatusBadge from './StatusBadge';

function RowActions({ student, onDelete }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => navigate(`/students/${student.id}`)}
        className="rounded-md p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400"
        aria-label={`View ${student.fullName}`}
        title="View"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => navigate(`/students/${student.id}/edit`)}
        className="rounded-md p-1.5 text-slate-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/30 dark:hover:text-amber-400"
        aria-label={`Edit ${student.fullName}`}
        title="Edit"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(student)}
        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
        aria-label={`Delete ${student.fullName}`}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function StudentTable({ students, onDelete }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop / tablet table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700 dark:text-slate-500">
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Class</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Gender</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((student) => (
              <tr key={student.id} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50" onClick={() => navigate(`/students/${student.id}`)}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={student.fullName} size="sm" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">{student.fullName}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Roll No. {student.rollNo}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  Class {student.class} - {student.section}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  <p className="flex items-center gap-1.5 text-xs">
                    <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                    {student.email}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs">
                    <Phone className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                    {student.phone}
                  </p>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{student.gender}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={student.status} />
                </td>
                <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                  <RowActions student={student} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800 md:hidden">
        {students.map((student) => (
          <div key={student.id} className="flex items-start gap-3 px-4 py-3">
            <Avatar name={student.fullName} size="sm" />
            <div className="min-w-0 flex-1" onClick={() => navigate(`/students/${student.id}`)}>
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-medium text-slate-800 dark:text-slate-100">{student.fullName}</p>
                <StatusBadge status={student.status} />
              </div>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                Roll No. {student.rollNo} · Class {student.class}-{student.section}
              </p>
              <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{student.email}</p>
            </div>
            <RowActions student={student} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </>
  );
}
