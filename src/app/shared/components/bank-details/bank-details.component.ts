import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'src/app/shared/services/confirmation_service/confirmation.service';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { StudentService } from 'src/app/shared/services/student_services/student.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { AddEditBankDetailsComponent } from './add-edit-bank-details/add-edit-bank-details.component';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  @Input() Type
  @Input() person_id
  dataFetch:boolean = false
  loader:boolean = false
  update:boolean = false
  disableActions:boolean = false
  bankDetails: any 
  constructor(
    public http:HttpClient, 
    public dialog: MatDialog, 
    public toster: ToastrService, 
    public apiService: ApiService, 
    public authService: AuthService,
    public employeeService: EmployeeService,
    public confirmationService: ConfirmationService
  ) { }

  async ngOnInit() {
    this.bankDetails= {
      person_id:this.person_id,
      ifsc:"",
      micr:"",
      account_type:"",
      bank_name:"",
      branch:"",
      address:"",
      account_number:"",
      acc_holder_name:"",
    };
    console.log(this.Type);
    this.loader = false
    this.disableActions = false
    await this.fetchApi()
  }

  async fetchApi() {
    this.dataFetch = false;
    
    await this.apiService
      .getTypeRequest(`get_bank_info/${this.Type}/` + this.person_id)
      .subscribe((result: any) => {
        if (result.result) {
          this.bankDetails = result.data;
          this.bankDetails.person_id = this.person_id;
        } else {
          if (result.error_code === "INVALID_LOGIN") {
            this.toster.error("Session Expired");
            this.authService.SignOut();
          }
        }
        this.dataFetch = true;
      });
  }

  addDetails(){
    const dialogRef = this.dialog.open(AddEditBankDetailsComponent,{
      width:"50%",
      data:{
        bankDetails:this.bankDetails,
        personType:this.Type,
        opertaion:"insert"
      }
    })

    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result){
        this.toster.success("Data added successfully")
        this.confirmationService.showSuccessMessage("Added!","Data added Successfully!!!")
        this.ngOnInit()
      }
    })
  }

  editDetails(){
    this.disableActions = true
    const dialogRef = this.dialog.open(AddEditBankDetailsComponent,{
      width:"50%",
      data:{
        bankDetails:this.bankDetails,
        personType:this.Type,
        opertaion:"update"
      }
    })

    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result){
        this.toster.success("Data updated successfully")
        this.confirmationService.showSuccessMessage("Updated!","Data updated Successfully!!!")
        this.ngOnInit()
      }
      this.disableActions = false
    })
  }

  async deleteDetails(){
    this.disableActions = true
    this.confirmationService.showConfirmMessage().then((result:any)=>{
      if(result.value){
        const data = {
          bank_id:this.bankDetails.bank_id
        }
        this.apiService.postTypeRequest(`bank_info/delete/${this.Type}`,data).subscribe((result:any)=>{
          if(result.result){
            this.toster.success("Data deleted successfully")
            this.confirmationService.showSuccessMessage("Deleted!",result.message)
            this.dataFetch = true
            this.ngOnInit()
          }else{
            this.toster.error(result.message)
          }
        })
      }else{
        this.disableActions = false
      }
    })
  }

}
