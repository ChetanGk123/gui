import { Injectable } from '@angular/core';  
import * as CryptoJS from 'crypto-js'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public selectedStudent:any 
  public selectedTab:any
  public admission_data:any
  public current_academic_details:any
  public personal_data:any
  public parent_data:any
  public previous_academic_data:any
  public student_documents:any
  encPassword = environment.encPassword;
  constructor() { }

  setSelectedStudent(student:any){
    this.selectedStudent = student
    var enc = CryptoJS.AES.encrypt(JSON.stringify(student), this.encPassword).toString();
    localStorage.setItem('selectedStudent',enc)
  }
  setSelectedTab(tab:any){
    localStorage.setItem('selectedTab',tab??"Profile")
  }

  get getSelectedStudent(){
    return this.selectedStudent??JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("selectedStudent"), this.encPassword.trim()).toString(CryptoJS.enc.Utf8))??""
  }

  get getSelectedTab(){
    return this.selectedTab??localStorage.getItem('selectedTab')
  }

}
