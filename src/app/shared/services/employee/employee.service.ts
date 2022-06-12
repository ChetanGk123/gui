import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js'; 
import { environment } from '../../../../environments/environment';

interface employee_info {
  employee_id?: number ;
  institution_id?: number ;
  serial_no?: number ;
  employee_no?: string ;
  f_name?: string ;
  m_name?: string ;
  l_name?: string ;
  dob?: string ;
  nationality?: string ;
  email?: string ;
  mobile?: string ;
  current_address?: string ;
  current_city?: string ;
  current_pin?: string ;
  current_taluka?: string ;
  current_district?: string ;
  current_state?: string ;
  current_country?: string ;
  permanent_address?: string ;
  permanent_city?: string ;
  permanent_pin?: string ;
  permanent_taluka?: string ;
  permanent_district?: string ;
  permanent_state?: string ;
  permanent_country?: string ;
  photo?: string ;
  blood_group_id?: number ;
  blood_group_name?: string ;
  religion_id?: number ;
  religion_name?: string ;
  caste_id?: number ;
  caste_name?: string ;
  category_id?: number ;
  category_name?: string ;
  gender_id?: number ;
  gender_name?: string ;
  joining_date?: string ;
  link?: string ;
  generate_emp_no?: boolean ;
}
interface qualification_info{
  institute_name?:string
  university_name?:string
  qualification_name?:string
  graduation_date?:string
  qualification_type?:string
  total_per?:number
  scored_per?:number
}
@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  encPassword = environment.encPassword;
  selectedEmployee
  selectedTab
  constructor() {}

  setSelectedEmployee(employee:any){
    this.selectedEmployee = employee
    var enc = CryptoJS.AES.encrypt(JSON.stringify(employee), this.encPassword).toString();
    localStorage.setItem('selectedEmployee',enc)
  }
  setSelectedTab(tab:any){
    localStorage.setItem('selectedTab',tab??"Profile")
  }

  get getSelectedEmployee(){
    return this.selectedEmployee??JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("selectedEmployee"), this.encPassword.trim()).toString(CryptoJS.enc.Utf8))??""
  }

  get getSelectedTab(){
    return this.selectedTab??localStorage.getItem('selectedTab')
  }
}
