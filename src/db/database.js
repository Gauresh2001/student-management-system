import Dexie from 'dexie';
import { MOCK_STUDENTS } from '../data/mockStudents';

export const db = new Dexie('StudentManagementDB');

db.version(1).stores({
  students: 'id, rollNo, firstName, lastName, fullName, class, section, email, status',
});

// Version 2: clear old generated data and load new student records
db.version(2).stores({
  students: 'id, rollNo, firstName, lastName, fullName, class, section, email, status',
}).upgrade(async (tx) => {
  await tx.students.clear();
  await tx.students.bulkAdd(MOCK_STUDENTS);
});

export async function seedIfEmpty() {
  const count = await db.students.count();
  if (count === 0) {
    await db.students.bulkAdd(MOCK_STUDENTS);
  }
}
