export interface AdmissionForm {
  student_info:student_info,
  parent_info:parent_info,
  academic_info:academic_info,
  previous_academic: schoolHistory[];
}

export interface schoolHistory {
  slNo: number;
  institution_name: string;
  scholarship: string;
  std_attended: string;
  leave_date: string;
  reason: string;
}

export interface student_info {
  generate_admission_no: string;
  admission_date: string;
  f_name: string;
  m_name: string;
  l_name: string;
  dob: string;
  current_address: string;
  permanent_address: string;
  religion_id: string;
  caste_id: string;
  category_id: string;
  gender_id: string;
  admission_no: string;
  sats_no: string;
  email: string;
  mobile: string;
  height: string;
  weight: string;
  bg_id: string;
  languages_studied: string;  
  previous_medium_of_instrutcion: string,
  is_special_needs: string;
  special_needs: string
}
export interface parent_info {
  fathers_name: string;
  mothers_name: string;
  guardian_relation: string;
  guardians_name: string;
  guardians_mobile: string;
  guardians_doc_id: string;
  guardian_doc_no: string;
  guardian_address: string;

  fathers_mobile: string;
  fathers_email: string;
  father_occupation: string;
  fathers_doc_id: string;
  fathers_doc_no: string;

  father_education: string;
  father_income: string;
  mother_education: string;
  mother_income: string;

  no_of_family_members: number;
  no_of_brothers: number;
  no_of_sisters: number;

  mothers_occupation: string;
  mothers_mobile: string;
  mothers_email: string;
  mothers_doc_id: string;
  mothers_doc_no: string;

  guardians_email: string;
  guardians_occupation: string;
}
export interface academic_info {
  academic_year_id:string,
  dept_id:string,
  class_id:string,
  division_id:string,
}
export interface academic_history_info {}
