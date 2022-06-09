import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { StudentService } from 'src/app/shared/services/student_services/student.service';
import { FeePaymentComponent } from '../fee-payment/fee-payment.component';
import { FeeVoucherComponent } from '../fee-voucher/fee-voucher.component';
import { FeeService } from '../Service/fee.service';

@Component({
  selector: 'app-collect-fees',
  templateUrl: './collect-fees.component.html',
  styleUrls: ['./collect-fees.component.scss']
})
export class CollectFeesComponent implements OnInit {

  //student: any = this.studentService.getSelectedStudent;
  public isFilter: boolean = true;
  public dataFetch: boolean = false;
  filterForm: FormGroup = new FormGroup({
    academicYear: new FormControl(""),
    department: new FormControl(""),
    class: new FormControl(""),
    studentName: new FormControl(""),
  });
  List:any =[]
  departmentList:any =[]
  classList:any =[]
  StudentList:any =[]
  Students:any =[]
  
  constructor( public studentService:StudentService, public dialog: MatDialog,public apiService: ApiService, public feeService: FeeService, public router: Router, public toster: ToastrService) { }

  ngOnInit(): void { 
    this.dataFetch = true
    this.apiService.getTypeRequest("dropdown_data/DEPARTMENT").subscribe((result: any) => {
      if (result.result) {
        this.departmentList = result.data;
      } else {
        this.toster.error(result.message);
      }
    });
    this.apiService.getTypeRequest("dropdown_data/CLASS").subscribe((result: any) => {
      if (result.result) {
        this.classList = result.data;
      } else {
        this.toster.error(result.message);
      }
    });
    this.apiService.getTypeRequest("get_due_fees").subscribe((result: any) => {
      if (result.result) {
        this.StudentList = result.data;
        this.Students = this.StudentList
        this.dataFetch = false;
      }else{
        this.toster.error(result.message)
      }
    });
  }

  payFees(product,student){
    const dialogRef = this.dialog.open(FeePaymentComponent,{ 
      data:{
        student_name:student.student_name,
        fee_allocation_id:product.fee_allocation_id,
        fee_group_name:product.fee_group_name,
        student_id:student.student_id,
        current_academic_name:product.current_academic_name,
        fee_component_data:product.fee_component_data
      },
      width:"50%",
      height:"80%"
    })

    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result?.result){
        this.ngOnInit()
        console.log(result);
        const data = {
          id:result['data'].student.TXN_ID
        }
        const dialogRef1 = this.dialog.open(FeeVoucherComponent, {
          data: data,
          height: "88%",
            width: "80%", 
        });
      }
    })
  }
}
