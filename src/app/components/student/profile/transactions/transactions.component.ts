import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../shared/services/student_services/student.service';
import { ApiService } from '../../../../shared/services/auth/api.service'
import { MatDialog } from '@angular/material/dialog';
import { FeeVoucherComponent } from 'src/app/components/fees/fee-voucher/fee-voucher.component';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public dataFetch:boolean = false;
  student: any = this.studentService.getSelectedStudent;
  TransactionsList = [];
  TempTransactionsList = [];
  filterValue:any = '';
  editValue:any = '';
  constructor(public studentService:StudentService,public apiService: ApiService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.dataFetch = true;
    const data = {
      student_id:this.student.student_id
    }
    this.apiService
      .postTypeRequest(`transactions/STUDENT`,data)
      .subscribe((result: any) => {
        this.TransactionsList = result.data.transactions;
        this.TempTransactionsList = result.data.transactions;
        this.dataFetch = false;
      });
  }

  onFilter(value){
    this.editValue = value; 
    this.TransactionsList =[];
    this.TempTransactionsList.filter( (x) => {
      if(x.receipt_no.toLowerCase().includes(value.toLowerCase()))
      this.TransactionsList.push(x)
    })
  }

  onClear(){
    this.TransactionsList = this.TempTransactionsList;
  }

  printTransaction(product){
    console.log(product);
    
    const dialogRef = this.dialog.open(FeeVoucherComponent, {
      data: product,
      height: "88%",
        width: "80%", 
    });
  }
}