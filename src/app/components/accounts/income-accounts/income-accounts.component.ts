import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DatatableComponent, ColumnMode, SortType, id } from "@swimlane/ngx-datatable";

import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { ConfirmationService } from "src/app/shared/services/confirmation_service/confirmation.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { AccountTransferComponent } from "../account-transfer/account-transfer.component";

@Component({
  selector: "app-income-accounts",
  templateUrl: "./income-accounts.component.html",
  styleUrls: ["./income-accounts.component.scss"],
})
export class IncomeAccountsComponent implements OnInit {
  public isFeeGroupFilter: boolean = true;
  public submitDisable: boolean = false;
  dataFetch: boolean = false;
  editIndex = -1;
  editValue: string;
  List: any[] = [];
  id: number;
  institution_id: number;
  feeGroup: any[] = [];
  filterValue: string = "";
  addValue: string = "";

  accountForm: FormGroup = new FormGroup({
    account_id: new FormControl(),
    account_name: new FormControl("", Validators.required),
    opening_balance: new FormControl({ value: "", disabled: false }, Validators.required),
  });
  constructor(
    public apiService: ApiService,
    public spinner: SpinnerService,
    public toster: ToastrService,
    public confirmationService: ConfirmationService,
    public dialog: MatDialog
  ) {}
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  SortType = SortType;

  ngOnInit() {
    this.dataFetch = true;
    this.submitDisable = false;
    this.addValue = "";
    this.apiService.getTypeRequest("table_data/ACCOUNT_HEAD").subscribe((result: any) => {
      this.List = result.data;
      this.feeGroup = result.data;
      this.dataFetch = false;
    });
  }

  onClear() {
    this.List = this.feeGroup;
  }

  update(data) {
    this.accountForm.patchValue({
      account_id: data.account_id,
      account_name: data.account_name,
      opening_balance: data?.opening_balance,
    });
    this.accountForm.controls.opening_balance.disable();
  }

  onFilter(value) {
    this.List = [];
    this.feeGroup.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase())) this.List.push(x);
    });
  }

  isValueAvailable() {
    var value = this.List.filter((x) => {
      if (x.account_name.toLowerCase() == this.accountForm.get("account_name").value.toLowerCase()) return x;
    });
    return value.length > 0 ? false : true;
  }

  onAddNew() {
    this.accountForm.markAllAsTouched();
    this.submitDisable = true;
    if (this.accountForm.valid && this.accountForm.get("account_id").value?.toString().length > 0) {
      this.confirmationService.showUpdateConfirmDialog().then((result: any) => {
        if (result.value) {
          this.apiService
            .postTypeRequest("account_head/update", this.accountForm.value)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data Updated");
                this.confirmationService.showSuccessMessage("Data Updated", result.message);

                this.ngOnInit();
                this.Clear();
              } else {
                this.confirmationService.showErrorMessage("Cancelled!", result.message);
                this.toster.error(result.message);
                this.submitDisable = false;
              }
            });
        }
      });
    } else if (this.accountForm.valid && this.isValueAvailable()) {
      this.apiService.postTypeRequest("account_head/insert", this.accountForm.value).subscribe((result: any) => {
        if (result.result) {
          this.feeGroup = result.data;
          this.List = result.data;
          this.ngOnInit();
          this.Clear();
          this.toster.success("New Data Added");
          this.confirmationService.showSuccessMessage("Added", result.message);
        } else {
          this.toster.error(result.message);
          this.confirmationService.showErrorMessage("Cancelled!", result.message);
          this.submitDisable = false;
        }
      });
      this.addValue = "";
    } else if (this.accountForm.valid) {
      this.toster.error("Value alredy Exists");
      this.submitDisable = false;
    } else {
      this.toster.error("Cannot add empty value");
      this.submitDisable = false;
    }
  }

  Clear() {
    this.accountForm.reset();
    this.accountForm.enable();
    (this.id = null), (this.institution_id = null);
  }

  AccountTransfer() {
    const dialogRef = this.dialog.open(AccountTransferComponent, 
      { 
        backdropClass: "blurred", 
        height:"80vH",
        panelClass:["xl-40","sm-80","md-50"],
        data: {
          title:"BALANCE TRANSFER",
          url:"BALANCE_TRANSFER",
          sourceList:this.List,
          destinationList:this.List
        } 
      });
  }

  updateBalance(data:any) {
    var tempList:any[] = [data]
    const dialogRef = this.dialog.open(AccountTransferComponent, 
      { 
        backdropClass: "blurred", 
        height:"80vH",
        panelClass:["xl-40","sm-80","md-50"],
        data: {
          title:"INCOME CREDIT",
          url:"INCOME_CREDIT",
          destinationList:tempList,
          disableSource:true
        } 
      });
  }
}
