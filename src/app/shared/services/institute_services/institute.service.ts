import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  public selectedInstitute:any
  constructor() { }

  setSelectedInstitute(institute:any){
    this.selectedInstitute = institute
    localStorage.setItem('selectedInstitute',JSON.stringify(institute))
  }

  get getSelectedInstitute(){
    return this.selectedInstitute??JSON.parse(localStorage.getItem('selectedInstitute'))
  }
}
