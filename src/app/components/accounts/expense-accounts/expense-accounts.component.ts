import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DatatableComponent, ColumnMode, SortType, id } from "@swimlane/ngx-datatable";

import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { ConfirmationService } from "src/app/shared/services/confirmation_service/confirmation.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";

@Component({
  selector: 'app-expense-accounts',
  templateUrl: './expense-accounts.component.html',
  styleUrls: ['./expense-accounts.component.scss']
})
export class ExpenseAccountsComponent implements OnInit {
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
  balance: string = "";

  accountForm:FormGroup = new FormGroup({
    account_id: new FormControl(),
    isExpenseHead: new FormControl(1),
    account_name: new FormControl('',Validators.required),
    opening_balance: new FormControl({value: '', disabled: false}, Validators.required),
  })
  constructor(
    public apiService: ApiService,
    public spinner: SpinnerService,
    public toster: ToastrService,
    private fb: FormBuilder,
    public confirmationService: ConfirmationService
  ) {}
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  SortType = SortType;

  ngOnInit() {
    this.dataFetch = true;
    this.submitDisable = false;
    this.addValue = "";
    this.apiService.getTypeRequest("new_table_data/EXPENSE_ACCOUNT_HEAD").subscribe((result: any) => {
      if(result.result){
        this.List = result.data;
        this.feeGroup = result.data;
      }
      this.dataFetch = false;
    });
  }

  onClear() {
    this.List = this.feeGroup;
  }

  update(data) {
    this.accountForm.patchValue({
      account_id:data.account_id,
      account_name:data.account_name,
      opening_balance:data?.opening_balance,
    })
    this.accountForm.controls.opening_balance.disable()
  }

  onFilter(value) {
    this.List = [];
    this.feeGroup.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase())) this.List.push(x);
    });
  }

  isValueAvailable() {
    var value = this.List.filter((x) => {
      if (x.account_name.toLowerCase() == this.accountForm.get('account_name').value.toLowerCase()) return x;
    });
    return value.length > 0 ? false : true;
  }

  onAddNew() {
    this.accountForm.markAllAsTouched()
    this.submitDisable = true;
    if (this.accountForm.valid && this.accountForm.get('account_id').value?.toString().length > 0) {
      
      this.confirmationService.showUpdateConfirmDialog().then((result: any) => {
        debugger
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
    }else if(this.accountForm.valid && this.isValueAvailable()){
      
      this.apiService.postTypeRequest('account_head/insert',this.accountForm.value).subscribe((result:any) => {
        if(result.result){
          this.feeGroup = result.data
          this.List = result.data
          this.ngOnInit();
          this.toster.success("New Data Added")
          this.confirmationService.showSuccessMessage("Added", result.message);
        }
        else{
          this.toster.error(result.message)
          this.confirmationService.showErrorMessage("Cancelled!", result.message);
          this.submitDisable = false
        }
      })
      this.addValue = ""
    } 
    else if(this.accountForm.valid){
      this.toster.error("Value alredy Exists")
      this.submitDisable = false
    }
    else{
      this.toster.error("Cannot add empty value")
      this.submitDisable = false
    }
  }

  Clear(){
    this.accountForm.reset()
    this.accountForm.enable()
    this.addValue="",
    this.id = null,
    this.institution_id = null
  }
}
