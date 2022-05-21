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
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  userForm:FormGroup = new FormGroup({
    role_id:new FormControl(''),
    institution_id:new FormControl(''),
    role_name:new FormControl('',[Validators.required]),
  })
  institute: any;
  constructor(public instituteService:InstituteService,public apiService:ApiService,public toster:ToastrService,public dialog:MatDialog,public dialogRef: MatDialogRef<AddRoleComponent>,@Inject(MAT_DIALOG_DATA) public dialogdata: any) { }

  ngOnInit(): void {
    this.institute = this.instituteService.getSelectedInstitute;
    if(this.dialogdata){
      this.userForm.patchValue({
        inst_id:this.dialogdata.inst_id??'',
        role_name:this.dialogdata.name??'',
        institution_id:this.institute.inst_id
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
          //     .postTypeRequest("role/update", this.userForm.value)
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
        this.apiService.postTypeRequest('role/insert',this.userForm.value).subscribe((result:any) => {
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
