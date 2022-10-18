import { Component, Inject, OnInit, Type } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-add-edit-bank-details",
  templateUrl: "./add-edit-bank-details.component.html",
  styleUrls: ["./add-edit-bank-details.component.scss"],
})
export class AddEditBankDetailsComponent implements OnInit {
  loader: boolean;
  bankDetails: FormGroup = new FormGroup({
    person_id: new FormControl(this.config.data.bankDetails.person_id),
    ifsc: new FormControl(this.config.data.bankDetails.ifsc ?? "", [Validators.required]),
    micr: new FormControl(this.config.data.bankDetails.micr ?? ""),
    account_type: new FormControl(this.config.data.bankDetails.account_type ?? "", [Validators.required]),
    bank_name: new FormControl(this.config.data.bankDetails.bank_name ?? "", [Validators.required]),
    branch: new FormControl(this.config.data.bankDetails.branch ?? "", [Validators.required]),
    address: new FormControl(this.config.data.bankDetails.address ?? "", [Validators.required]),
    account_number: new FormControl(this.config.data.bankDetails.account_number ?? "", [Validators.required]),
    acc_holder_name: new FormControl(this.config.data.bankDetails.acc_holder_name ?? "", [Validators.required]),
  });
  constructor(public toster: ToastrService, public apiService: ApiService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.loader = false;
    // console.log(this.config.data);
  }

  resetBankDetails() {
    this.bankDetails.reset({
      person_id: this.config.data.bankDetails.person_id,
      ifsc: "",
      micr: "",
      account_type: "",
      bank_name: "",
      branch: "",
      address: "",
      account_number: "",
      acc_holder_name: "",
    });
  }

  submitBankDetails() {
    if (this.bankDetails.valid) {
      this.loader = true;
      this.apiService.postTypeRequest(`bank_info/${this.config.data.opertaion}/${this.config.data.personType}`, this.bankDetails.value).subscribe((result: any) => {
        // console.log(result);
        if (result.result) {
          this.ref.close(true);
        } else {
          this.toster.error(result.message);
          this.loader = false;
        }
      });
    } else {
      // for (const control  in this.bankDetails.controls) {
      //   this.bankDetails.get(control).markAllAsTouched()
      // }
      this.bankDetails.markAllAsTouched();
      this.toster.error("Enter all manditory details.");
    }
    // this.apiService.postTypeRequest("bank_info/INSERT")
  }
}
