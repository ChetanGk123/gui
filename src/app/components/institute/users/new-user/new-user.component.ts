import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { InstituteService } from 'src/app/shared/services/institute_services/institute.service';

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm:FormGroup = new FormGroup({
    inst_id:new FormControl('',[Validators.required]),
    full_name:new FormControl('',[Validators.required]),
    phone_number:new FormControl('',[Validators.required]),
    role_id:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
  })
  constructor(public apiService:ApiService,public instituteService:InstituteService,public toster:ToastrService,public dialog:MatDialog,public dialogRef: MatDialogRef<NewUserComponent>,@Inject(MAT_DIALOG_DATA) public dialogdata: any) { }

  institute:any = this.instituteService.getSelectedInstitute;
  ngOnInit(): void {
    if(this.dialogdata){
      this.userForm.patchValue({
        inst_id:this.institute.inst_id,
        full_name:this.dialogdata.name??'',
        phone_number:this.dialogdata.phone_number??'',
        role_id:this.dialogdata.Role??'',
        email:this.dialogdata.email??'',
      })
    }
  }

  OnSubmit(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    if(this.userForm.valid){
      if(this.dialogdata?.name){
        swalWithBootstrapButtons.fire({
          title: 'Are you sure, you want to Update?',
          text: "Perviously registered data will be affected!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, update it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          // if (result.value) {
          //   this.apiService
          //     .postTypeRequest("fee_group/update", this.userForm.value)
          //     .toPromise()
          //     .then((result: any) => {
          //       if (result.result) {
          //         this.toster.warning("Data Updated");
          //         swalWithBootstrapButtons.fire(
          //           'Updated!',
          //           result.message,
          //           'success'
          //         )
          //         this.ngOnInit();
          //       } else {
          //         swalWithBootstrapButtons.fire(
          //           'Cancelled',
          //           result.message,
          //           'error'
          //         )
          //         this.toster.error(result.message);
          //       }
          //     });
          // } 
        })
      }else{
        this.apiService.postTypeRequest('new_user',this.userForm.value).subscribe((result:any) => {
          if(result.result){
            this.ngOnInit();
            this.toster.success("New Data Added")
            swalWithBootstrapButtons.fire(
              'Added!',
              result.message + result.data,
              'success'
            )
            this.dialogRef.close(true)
          }
          else{
            this.toster.error(result.message)
          }
        })
      }
    }
    else{
      this.toster.error('Enter all details',"Incomplete Details")
    }
  }

}
