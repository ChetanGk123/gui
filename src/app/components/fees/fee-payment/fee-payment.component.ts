import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { ConfirmationService } from "src/app/shared/services/confirmation_service/confirmation.service";

@Component({
  selector: "app-fee-payment",
  templateUrl: "./fee-payment.component.html",
  styleUrls: ["./fee-payment.component.scss"],
})
export class FeePaymentComponent implements OnInit {
  public clicked: boolean = false;
  paymentForm: FormGroup = new FormGroup({
    student_id: new FormControl(this.dialogdata.student_id),
    fee_allocation_id: new FormControl(this.dialogdata.fee_allocation_id),
    account_head_id: new FormControl("", [Validators.required]),
    transaction_amount: new FormControl("", [Validators.required]),
    payment_mode: new FormControl(""),
    payment_ref: new FormControl(""),
    user_comments: new FormControl(""),
    payment_date: new FormControl("", [Validators.required]),
  });
  accountHeadList: any = [];
  constructor(public apiService: ApiService, public toster: ToastrService, public dialog: MatDialog, public confirmationService: ConfirmationService, public dialogRef: MatDialogRef<FeePaymentComponent>, @Inject(MAT_DIALOG_DATA) public dialogdata: any) {}

  ngOnInit(): void {
    this.apiService.getTypeRequest("dropdown_data/ACCOUNT_HEAD").subscribe((result: any) => {
      if (result.result) {
        this.accountHeadList = result.data;
      } else {
      }
    });
  }

  OnSubmit() {
    this.clicked = true;
    this.apiService.postTypeRequest("mark_fee_payment", this.paymentForm.value).subscribe((result: any) => {
      if (result.result) {
        this.confirmationService.showSuccessMessage("Added", result.message);
        this.dialogRef.close(result);
      } else {
      }
    });
  }
}
