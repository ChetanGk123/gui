import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/auth/api.service';

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  instituteForm: FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone_number:new FormControl('',[Validators.required,Validators.maxLength(12),Validators.minLength(10)]),
    registered_on:new FormControl('',[Validators.required]),
    license_plan_id:new FormControl('',[Validators.required]),
    license_start_date:new FormControl('',[Validators.required]),
  })
  license_plans:any[] = [];
  constructor(public apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getTypeRequest('dropdown_data/LICENSE_PLAN').subscribe((result:any) =>{
      if(result.result){
        this.license_plans = result.data
      }
    })
  }

  OnSubmit(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    if(this.instituteForm.valid){
      this.apiService.postTypeRequest('register_new_institution',this.instituteForm.value).subscribe((result:any)=>{
        if(result.result){
          this.instituteForm.reset()
          swalWithBootstrapButtons.fire(
            'Updated!',
            result.message,
            'success'
          )
        }
      })
    }
  }

  dateChange(event,field){
    this.instituteForm.get(field).setValue(event.year +'-'+event.month+'-'+event.day)
  }
  OnClear(){
    this.instituteForm.reset()
  }
}
