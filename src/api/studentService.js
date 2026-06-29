import { db, seedIfEmpty } from '../db/database';

// Seed the H2-equivalent IndexedDB store on first load
const initialized = seedIfEmpty();

export async function getStudents({
  search = '',
  classFilter = '',
  sectionFilter = '',
  statusFilter = '',
  page = 1,
  pageSize = 10,
} = {}) {
  await initialized;

  let students = await db.students.toArray();

  const query = search.trim().toLowerCase();
  if (query) {
    students = students.filter(
      (s) =>
        s.fullName.toLowerCase().includes(query) ||
        s.rollNo.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.id.toLowerCase().includes(query),
    );
  }

  if (classFilter) {
    students = students.filter((s) => s.class === classFilter);
  }

  if (sectionFilter) {
    students = students.filter((s) => s.section === sectionFilter);
  }

  if (statusFilter) {
    students = students.filter((s) => s.status === statusFilter);
  }

  const total = students.length;
  const start = (page - 1) * pageSize;
  const data = students.slice(start, start + pageSize);

  return { data, total, page, pageSize };
}

export async function getStudentById(id) {
  await initialized;
  return (await db.students.get(id)) ?? null;
}

export async function createStudent(payload) {
  await initialized;

  const allIds = await db.students.orderBy('id').primaryKeys();
  const maxId = allIds.length > 0 ? allIds[allIds.length - 1] : null;
  const nextNum = maxId ? parseInt(maxId.slice(3), 10) + 1 : 1;
  const id = `STU${String(nextNum).padStart(4, '0')}`;

  const student = {
    id,
    rollNo: payload.rollNo,
    firstName: payload.firstName,
    lastName: payload.lastName,
    fullName: `${payload.firstName} ${payload.lastName}`,
    class: payload.class,
    section: payload.section,
    gender: payload.gender,
    dob: payload.dob,
    bloodGroup: payload.bloodGroup,
    email: payload.email,
    phone: payload.phone,
    guardianName: payload.guardianName,
    guardianRelation: payload.guardianRelation,
    guardianPhone: payload.guardianPhone,
    address: payload.address,
    admissionDate: payload.admissionDate,
    status: payload.status || 'Active',
  };

  await db.students.add(student);
  return student;
}

export async function updateStudent(id, payload) {
  await initialized;

  const existing = await db.students.get(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...payload,
    id,
    fullName: `${payload.firstName ?? existing.firstName} ${payload.lastName ?? existing.lastName}`,
  };

  await db.students.put(updated);
  return updated;
}

export async function deleteStudent(id) {
  await initialized;
  await db.students.delete(id);
  return { success: true };
}
