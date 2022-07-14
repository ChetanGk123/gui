import { Component, Inject, OnInit, Type } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';

@Component({
  selector: 'app-add-edit-bank-details',
  templateUrl: './add-edit-bank-details.component.html',
  styleUrls: ['./add-edit-bank-details.component.scss']
})
export class AddEditBankDetailsComponent implements OnInit {


  loader:boolean
  bankDetails: FormGroup = new FormGroup({
    person_id: new FormControl(this.dialogdata.bankDetails.person_id),
    ifsc: new FormControl(this.dialogdata.bankDetails.ifsc??"",[Validators.required]),
    micr: new FormControl(this.dialogdata.bankDetails.micr??""),
    account_type: new FormControl(this.dialogdata.bankDetails.account_type??"",[Validators.required]),
    bank_name: new FormControl(this.dialogdata.bankDetails.bank_name??"",[Validators.required]),
    branch: new FormControl(this.dialogdata.bankDetails.branch??"",[Validators.required]),
    address: new FormControl(this.dialogdata.bankDetails.address??"",[Validators.required]),
    account_number: new FormControl(this.dialogdata.bankDetails.account_number??"",[Validators.required]),
    acc_holder_name: new FormControl(this.dialogdata.bankDetails.acc_holder_name??"",[Validators.required])
  })
  constructor(
    public toster: ToastrService, 
    public apiService: ApiService,
    public dialogRef: MatDialogRef<AddEditBankDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogdata: any
  ) { }

  ngOnInit(): void {
    this.loader = false;
    // console.log(this.dialogdata);
    
  }

  resetBankDetails(){
    this.bankDetails.reset({
      person_id:this.dialogdata.bankDetails.person_id,
      ifsc:"",
      micr:"",
      account_type:"",
      bank_name:"",
      branch:"",
      address:"",
      account_number:"",
      acc_holder_name:"",
    })
  }

  submitBankDetails(){
    if(this.bankDetails.valid){
      this.loader = true
        this.apiService.postTypeRequest(`bank_info/${this.dialogdata.opertaion}/${this.dialogdata.personType}`,this.bankDetails.value).subscribe((result:any)=>{
          // console.log(result);
          if(result.result){
            this.dialogRef.close(true);
          }else{
            this.toster.error(result.message)
            this.loader = false
          }
        })
    }else{
      // for (const control  in this.bankDetails.controls) {
      //   this.bankDetails.get(control).markAllAsTouched()
      // }
      this.bankDetails.markAllAsTouched()
      this.toster.error("Enter all manditory details.")
    }
    // this.apiService.postTypeRequest("bank_info/INSERT")
  }

}
