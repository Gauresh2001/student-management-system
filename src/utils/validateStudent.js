const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z\s'.-]{1,49}$/;

function isFutureDate(value) {
  if (!value) return false;
  return new Date(value) > new Date();
}

export function validateStudent(values) {
  const errors = {};

  if (!values.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (!NAME_REGEX.test(values.firstName.trim())) {
    errors.firstName = 'Enter a valid first name';
  }

  if (!values.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (!NAME_REGEX.test(values.lastName.trim())) {
    errors.lastName = 'Enter a valid last name';
  }

  if (!values.rollNo?.trim()) {
    errors.rollNo = 'Roll number is required';
  } else if (!/^[A-Za-z0-9-]{1,10}$/.test(values.rollNo.trim())) {
    errors.rollNo = 'Roll number must be alphanumeric (max 10 chars)';
  }

  if (!values.class) {
    errors.class = 'Class is required';
  }

  if (!values.section) {
    errors.section = 'Section is required';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required';
  }

  if (!values.dob) {
    errors.dob = 'Date of birth is required';
  } else if (isFutureDate(values.dob)) {
    errors.dob = 'Date of birth cannot be in the future';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit phone number';
  }

  if (!values.guardianName?.trim()) {
    errors.guardianName = "Guardian's name is required";
  }

  if (!values.guardianRelation) {
    errors.guardianRelation = 'Relation is required';
  }

  if (!values.guardianPhone?.trim()) {
    errors.guardianPhone = "Guardian's phone number is required";
  } else if (!PHONE_REGEX.test(values.guardianPhone.trim())) {
    errors.guardianPhone = 'Enter a valid 10-digit phone number';
  }

  if (!values.address?.trim()) {
    errors.address = 'Address is required';
  } else if (values.address.trim().length < 5) {
    errors.address = 'Address looks too short';
  }

  if (!values.admissionDate) {
    errors.admissionDate = 'Admission date is required';
  } else if (isFutureDate(values.admissionDate)) {
    errors.admissionDate = 'Admission date cannot be in the future';
  }

  if (!values.status) {
    errors.status = 'Status is required';
  }

  return errors;
}

export const STUDENT_FORM_DEFAULTS = {
  firstName: '',
  lastName: '',
  rollNo: '',
  class: '',
  section: '',
  gender: '',
  dob: '',
  bloodGroup: '',
  email: '',
  phone: '',
  guardianName: '',
  guardianRelation: '',
  guardianPhone: '',
  address: '',
  admissionDate: '',
  status: 'Active',
};
