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
  bood_group: string;
  caste: string;
  category: string;
  current_city: string;
  current_country: string;
  current_district: string;
  current_pin: string;
  current_state: string;
  current_taluka: string;
  dob: string;
  dob_in_words: string;
  gender: string;
  height: string;
  is_special_needs: string;
  languages_studied: string;
  nationality: string;
  permanent_city: string;
  permanent_country: string;
  permanent_district: string;
  permanent_pin: string;
  permanent_state: string;
  permanent_taluka: string;
  place_of_birth: string;
  previous_medium_of_instrutcion: string;
  religion: string;
  special_needs: string;
  stud_current_address: string;
  stud_permanent_address: string;
  student_email: string;
  student_mobile: string;
  student_name: string;
  student_photo: string;
  student_photo_base64: string;
  weight: string;
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
