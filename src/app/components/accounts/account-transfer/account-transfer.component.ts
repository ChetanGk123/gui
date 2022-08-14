import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-account-transfer",
  templateUrl: "./account-transfer.component.html",
  styleUrls: ["./account-transfer.component.scss"],
})
export class AccountTransferComponent implements OnInit {
  clicked: boolean;
  sourceList: any[];
  destinationList: any[];
  transactionForm: FormGroup = new FormGroup({
    source_id: new FormControl("", [Validators.required]),
    destination_id: new FormControl("", [Validators.required]),
    transaction_amount: new FormControl("", [Validators.required]),
    payment_mode: new FormControl("", [Validators.required]),
    payment_ref: new FormControl("", [Validators.required]),
    user_comments: new FormControl("", [Validators.required]),
    paid_by: new FormControl("", [Validators.required]),
    paid_to: new FormControl("", [Validators.required]),
    txn_date: new FormControl("", [Validators.required]),
  });
  constructor(public toster: ToastrService, public apiService: ApiService, public dialog: MatDialog, public dialogRef: MatDialogRef<AccountTransferComponent>, @Inject(MAT_DIALOG_DATA) public dialogdata: any) {}

  ngOnInit(): void {
    this.clicked = false;
    this.sourceList = this.dialogdata?.sourceList;
    this.destinationList = this.dialogdata.destinationList;
    if (this.dialogdata.disableSource) {
      this.transactionForm.controls.source_id.clearValidators();
      this.transactionForm.controls.destination_id.patchValue(this.dialogdata.destinationList[0].account_id);
    }
  }

  OnSubmit() {
    if (this.transactionForm.controls.destination_id.value.toString().length > 0 && this.transactionForm.controls.destination_id.value == this.transactionForm.controls.source_id.value) {
      this.transactionForm.controls.source_id.markAsDirty();
      this.transactionForm.controls.destination_id.markAsDirty();
      this.toster.error("Source A/c and Destination A/c cannot be same.", "Invalid Missing");
    }
    if (this.transactionForm.valid) {
      this.clicked = true;
      this.apiService
        .postTypeRequest(`account_head_txn/ACC_HEAD_${this.dialogdata.url}`, this.transactionForm.value)
        .toPromise()
        .then((result: any) => {
          if (result.result) {
            this.toster.success(result.message);
            this.dialogRef.close(true);
          } else {
            this.clicked = false;
          }
        });
    } else {
      this.toster.error("Enter all required details", "Details Missing");
      this.transactionForm.markAllAsTouched();
    }
  }
}
