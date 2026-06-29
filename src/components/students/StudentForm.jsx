import { useState } from 'react';
import FormField from '../ui/FormField';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { validateStudent } from '../../utils/validateStudent';
import { CLASS_OPTIONS, SECTION_OPTIONS, BLOOD_GROUPS, STATUS_OPTIONS } from '../../data/mockStudents';

function Section({ title, description, children }) {
  return (
    <div className="border-b border-slate-200 px-5 py-6 last:border-b-0 dark:border-slate-700">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{title}</h3>
      {description && <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{description}</p>}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export default function StudentForm({ initialValues, onSubmit, isSubmitting, submitLabel = 'Save', onCancel }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const setField = (name) => (event) => {
    setValues((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const setNameField = (name) => (event) => {
    const raw = event.target.value;
    const hasInvalidChars = /[^A-Za-z\s'.-]/.test(raw);
    const cleaned = raw.replace(/[^A-Za-z\s'.-]/g, '');
    const filtered = cleaned.slice(0, 15);
    setValues((prev) => ({ ...prev, [name]: filtered }));

    let liveError;
    if (hasInvalidChars) {
      liveError = 'Please enter a valid name (letters only)';
    } else if (cleaned.length > 15) {
      liveError = 'Name cannot exceed 15 characters';
    }
    setErrors((prev) => ({ ...prev, [name]: liveError }));
  };

  const setPhoneField = (name) => (event) => {
    const filtered = event.target.value.replace(/\D/g, '');
    setValues((prev) => ({ ...prev, [name]: filtered }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateStudent(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Section title="Personal Information" description="Basic identity details of the student.">
        <FormField label="First Name" htmlFor="firstName" required error={errors.firstName}>
          <Input id="firstName" value={values.firstName} onChange={setNameField('firstName')} invalid={Boolean(errors.firstName)} placeholder="e.g. Aarav" maxLength={15} />
        </FormField>
        <FormField label="Last Name" htmlFor="lastName" required error={errors.lastName}>
          <Input id="lastName" value={values.lastName} onChange={setNameField('lastName')} invalid={Boolean(errors.lastName)} placeholder="e.g. Sharma" maxLength={15} />
        </FormField>
        <FormField label="Date of Birth" htmlFor="dob" required error={errors.dob}>
          <Input id="dob" type="date" value={values.dob} onChange={setField('dob')} invalid={Boolean(errors.dob)} />
        </FormField>
        <FormField label="Gender" htmlFor="gender" required error={errors.gender}>
          <Select id="gender" value={values.gender} onChange={setField('gender')} invalid={Boolean(errors.gender)}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </FormField>
        <FormField label="Blood Group" htmlFor="bloodGroup" error={errors.bloodGroup}>
          <Select id="bloodGroup" value={values.bloodGroup} onChange={setField('bloodGroup')}>
            <option value="">Select blood group</option>
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </Select>
        </FormField>
      </Section>

      <Section title="Academic Information" description="Class placement and admission record.">
        <FormField label="Roll No." htmlFor="rollNo" required error={errors.rollNo}>
          <Input id="rollNo" value={values.rollNo} onChange={setField('rollNo')} invalid={Boolean(errors.rollNo)} placeholder="e.g. 023" />
        </FormField>
        <FormField label="Admission Date" htmlFor="admissionDate" required error={errors.admissionDate}>
          <Input id="admissionDate" type="date" value={values.admissionDate} onChange={setField('admissionDate')} invalid={Boolean(errors.admissionDate)} />
        </FormField>
        <FormField label="Class" htmlFor="class" required error={errors.class}>
          <Select id="class" value={values.class} onChange={setField('class')} invalid={Boolean(errors.class)}>
            <option value="">Select class</option>
            {CLASS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                Class {option}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Section" htmlFor="section" required error={errors.section}>
          <Select id="section" value={values.section} onChange={setField('section')} invalid={Boolean(errors.section)}>
            <option value="">Select section</option>
            {SECTION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                Section {option}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Status" htmlFor="status" required error={errors.status}>
          <Select id="status" value={values.status} onChange={setField('status')} invalid={Boolean(errors.status)}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormField>
      </Section>

      <Section title="Contact Information" description="How to reach the student.">
        <FormField label="Email" htmlFor="email" required error={errors.email}>
          <Input id="email" type="email" value={values.email} onChange={setField('email')} invalid={Boolean(errors.email)} placeholder="name@school.edu" />
        </FormField>
        <FormField label="Phone Number" htmlFor="phone" required error={errors.phone}>
          <Input id="phone" value={values.phone} onChange={setPhoneField('phone')} invalid={Boolean(errors.phone)} placeholder="10-digit mobile number" maxLength={10} />
        </FormField>
        <div className="sm:col-span-2">
          <FormField label="Address" htmlFor="address" required error={errors.address}>
            <Input id="address" value={values.address} onChange={setField('address')} invalid={Boolean(errors.address)} placeholder="House no, street, city" />
          </FormField>
        </div>
      </Section>

      <Section title="Guardian Information" description="Primary contact responsible for the student.">
        <FormField label="Guardian's Name" htmlFor="guardianName" required error={errors.guardianName}>
          <Input id="guardianName" value={values.guardianName} onChange={setNameField('guardianName')} invalid={Boolean(errors.guardianName)} maxLength={15} />
        </FormField>
        <FormField label="Relation" htmlFor="guardianRelation" required error={errors.guardianRelation}>
          <Select id="guardianRelation" value={values.guardianRelation} onChange={setField('guardianRelation')} invalid={Boolean(errors.guardianRelation)}>
            <option value="">Select relation</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Guardian">Guardian</option>
          </Select>
        </FormField>
        <FormField label="Guardian's Phone" htmlFor="guardianPhone" required error={errors.guardianPhone}>
          <Input id="guardianPhone" value={values.guardianPhone} onChange={setPhoneField('guardianPhone')} invalid={Boolean(errors.guardianPhone)} maxLength={10} />
        </FormField>
      </Section>

      <div className="flex justify-end gap-2 px-5 py-5">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
