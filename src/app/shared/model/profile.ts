export interface admission_data {
  student_id: string;
  admission_no: string;
  admission_date: string;
  sats_no: string;
}
export interface current_academic_details {
  academic_year: string;
  department: string;
  dept_code: string;
  class: string;
  division: string;
}

export interface personal_data {
  student_name: string;
  dob: string;
  dob_in_words: string;
  religion: string;
  caste: string;
  category: string;
  bood_group: string;
  gender: string;
  student_mobile: string;
  student_email: string;
  stud_current_address: string;
  stud_permanent_address: string;
  height: string;
  weight: string;
  student_photo: string;
  is_special_needs: number;
  languages_studied: string;
  previous_medium_of_instrutcion: string;
  special_needs: string;
}

export interface parent_data {
  fathers_name: string;
  mothers_name: string;
  fathers_mobile: string;
  fathers_email: string;
  father_education: string;
  father_occupation: string;
  father_income: string;
  mothers_mobile: string;
  mothers_email: string;
  mother_education: string;
  mothers_occupation: string;
  mother_income: string;
  family_members: string;
  brothers: string;
  sisters: string;
  guardian_relation: string;
  guardians_name: string;
  guardians_mobile: string;
  guardians_email: string;
  guardians_occupation: string;
  guardian_address: string;
}

export interface previous_academic_data {
  institution_name: string;
  leave_date: string;
  reason: string;
  scholarship: string;
  sr: string;
  standard_attended: string;
}
export interface student_documents {}
