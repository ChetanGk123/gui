import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "../../../../../shared/services/auth/api.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  public dataFetch: boolean = false;
  due_date: NgbDateStruct = { year: 1789, month: 7, day: 14 };
  feeComponentList: any = [];
  feeComponents: any;
  constructor(public toster: ToastrService, public dialog: MatDialog, public dialogRef: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) public dialogdata: any, public apiService: ApiService) {}

  ngOnInit(): void {
    console.log(this.dialogdata);
    
    this.dataFetch = true;
    let s = this.dialogdata.due_date.split("-");
    this.due_date = { year:Number(s[2]), month:Number(s[1]), day: Number(s[0])}
    this.feeComponentList = this.dialogdata.fee_component_data;
    this.feeComponents = this.dialogdata.fee_component_data;
    this.dataFetch = false;
  }

  updateFees(data) {
    let applicable_fee = this.feeComponents.find((x) => x.fee_component_id == data.fee_component_id).actual_fee;
    this.feeComponentList.find((x) => x.fee_component_id == data.fee_component_id).applicable_fees = Number(applicable_fee) - Number(data.discount) ?? 0;
  }

  dateChange(event, field) {
    this.dialogdata.due_date = event.day + "-" + event.month + "-" + event.year;
  }

  updateFee() {
    const data = {
      fee_allocation_id: this.dialogdata.fee_allocation_id,
      fee_group_id: this.dialogdata.fee_group_id,
      student_id: this.dialogdata.student_id,
      due_date: this.dialogdata.due_date,
      fee_component_data: this.feeComponentList,
      notes: this.dialogdata.notes,
    };
    this.apiService.postTypeRequest('update_assigned_fee',data).subscribe((result:any)=>{
      if(result.result){
        this.dialogRef.close(true)
        this.toster.success(result.message)
      }else{
        this.toster.error(result.message)
      }
    })
  }
}
