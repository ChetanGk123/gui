import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../../../shared/services/student_services/student.service";
import { ApiService } from "../../../../shared/services/auth/api.service";
import { disableDebugTools } from "@angular/platform-browser";
import { MatDialog } from "@angular/material/dialog";
import { EditComponent } from "./edit/edit.component";
import { ToastrService } from "ngx-toastr";
import { MenuItem } from "primeng/api";
import { AcknowledgementComponent } from "src/app/components/fees/acknowledgement/acknowledgement.component";
import { FeePaymentComponent } from "src/app/components/fees/fee-payment/fee-payment.component";
import { FeeVoucherComponent } from "src/app/components/fees/fee-voucher/fee-voucher.component";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-fees",
  templateUrl: "./fees.component.html",
  styleUrls: ["./fees.component.scss"],
})
export class FeesComponent implements OnInit {
  public dataFetch: boolean = false;
  student: any = this.studentService.getSelectedStudent;
  CurrentFeeList = [];
  selectedFees:any = [];
  TempCurrentFeeList = [];
  PreviousFeeList = [];
  filterValue: any = "";
  selectedProduct: any = [];
  editValue: any = "";
  items: MenuItem[] = [
    { label: "View", icon: "pi pi-fw pi-search", command: () => this.toster.success("View") },
    { label: "Delete", icon: "pi pi-fw pi-times", command: () => this.toster.error("Delete") },
  ];
  constructor(public toster: ToastrService, public studentService: StudentService, public apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataFetch = true;

    this.apiService.getTypeRequest(`assigned_fee/${this.student.student_id}`).subscribe((result: any) => {
      if(result.result){
        this.CurrentFeeList = result.data.current_academic_fees;
        this.TempCurrentFeeList = result.data.current_academic_fees;
        this.PreviousFeeList = result.data.previous_academic_fee;
        this.dataFetch = false;
      }else{
        this.toster.error(result.message)
        this.dataFetch = false;
      }
    });
  }

  onFilter(value) {
    this.editValue = value;
    this.CurrentFeeList = [];
    this.TempCurrentFeeList.filter((x) => {
      if (x.fee_group_name.toLowerCase().includes(value.toLowerCase())) this.CurrentFeeList.push(x);
    });
  }

  onClear() {
    this.CurrentFeeList = this.TempCurrentFeeList;
  }

  updateFees(data) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: data,
      maxHeight: "60vh",
      width: "60vw",
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  deleteFees(product) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure, you want to delete?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          let data = {
            fee_allocation_id: product.fee_allocation_id,
          };
          this.apiService.postTypeRequest("delete_assigned_fee", data).subscribe((result: any) => {
            if (result.result) {
              this.toster.success(result.message);
              this.ngOnInit();
            } else {
              this.toster.error(result.message);
            }
          });
        }
      });
  }

  printFee() {
    console.log(this.selectedFees);
    
    if(this.selectedFees.length > 0){
      const data  = this.selectedFees
      const dialogRef = this.dialog.open(AcknowledgementComponent, {
        data: data,
        height: "88%",
        width: "80%",
      });
      dialogRef.afterClosed().subscribe(()=>{
        console.log(this.selectedFees);
      })
    }
    else{
      this.toster.error("Select fee groups to print")
    }
  }

  payFees(product){
    const dialogRef = this.dialog.open(FeePaymentComponent,{
      data:{
        student_name:this.student.student_name,
        fee_allocation_id:product.fee_allocation_id,
        fee_group_name:product.fee_group_name,
        student_id:this.student.student_id,
        current_academic_name:product.current_academic_name,
        fee_component_data:product.fee_component_data
      },
      width:"50%",
      height:"80%"
    })

    dialogRef.afterClosed().subscribe((result:any)=>{
      console.log(result.data['student']);
      
      if(result.result){
        const dialogRef = this.dialog.open(FeeVoucherComponent, {
          data: result.data['student'],
          height: "88%",
          width: "80%",
        });
        this.ngOnInit()
      }
    })
  }
}
