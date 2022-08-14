import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DatatableComponent, ColumnMode, SortType } from "@swimlane/ngx-datatable";

import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { FeeService } from "src/app/components/fees/Service/fee.service";
import { Router } from "@angular/router";
import { ConfirmationService } from "src/app/shared/services/confirmation_service/confirmation.service";

@Component({
  selector: "app-fee-components",
  templateUrl: "./fee-components.component.html",
  styleUrls: ["./fee-components.component.scss"],
})
export class FeeComponentsComponent implements OnInit {
  loader: boolean = false;
  public isfeeComponentsFilter: boolean = true;
  dataFetch: boolean = false;
  List: any[] = [];
  CompList: any[] = [];
  feeComponents: any[] = [];
  feeComponentGroup: any[] = [];
  filterValue: string = "";
  filterGroupValue: string = "";
  constructor(public router: Router, public apiService: ApiService, private dialog: DialogService, public spinner: SpinnerService, public toster: ToastrService, public feeService: FeeService, public confirmationService: ConfirmationService) {}
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  SortType = SortType;

  FeeComponent: FormGroup = new FormGroup({
    fee_component_id: new FormControl(""),
    component_name: new FormControl("", [Validators.required]),
    group_name: new FormControl(""),
    group_id: new FormControl("", [Validators.required]),
    fees: new FormControl("", [Validators.required]),
  });

  ngOnInit() {
    this.loader = false;
    this.dataFetch = true;
    this.apiService.getTypeRequest("table_data/FEE_COMPONENT").subscribe((result: any) => {
      if (result.result) {
        this.CompList = result.data;
        this.feeComponents = result.data;
      } else {
      }
      this.dataFetch = false;
    });
    this.dataFetch = true;
    this.apiService.getTypeRequest("dropdown_data/FEE_GROUP").subscribe((result: any) => {
      if (result.result) {
        this.List = result.data;
      } else {
      }
      this.dataFetch = false;
    });
  }

  editClick(index, data) {
    this.FeeComponent.patchValue({
      fee_component_id: data.fee_component_id,
      component_name: data.component_name,
      group_name: data.group_name,
      group_id: data.group_id,
      fees: data.fees,
    });
  }

  onClearForm() {
    this.FeeComponent.reset({
      fee_component_id: null,
      component_name: "",
      group_name: "",
      group_id: "",
      fees: null,
    });
  }

  update(data) {}

  onClear() {
    this.CompList = this.feeComponents;
  }
  onFilter(value) {
    this.CompList = [];
    if (this.filterGroupValue.length > 0) {
      this.feeComponents.filter((x) => {
        if (x.component_name.toLowerCase().includes(value.toLowerCase()) && x.group_id == this.filterGroupValue) this.CompList.push(x);
      });
    } else {
      this.feeComponents.filter((x) => {
        if (x.component_name.toLowerCase().includes(value.toLowerCase())) this.CompList.push(x);
      });
    }
  }

  isValueAvailable() {
    var value = this.List.filter((x) => {
      if (x.name.toLowerCase() == this.FeeComponent.get("component_name").value.toLowerCase()) return x;
    });
    return value.length > 0 ? false : true;
  }

  onAddNew() {
    this.loader = true;

    if (this.FeeComponent.valid) {
      if (this.FeeComponent.get("fee_component_id").value) {
        var Request_Data = {
          fee_component_id: this.FeeComponent.get("fee_component_id").value,
          fee_group_id: this.FeeComponent.get("group_id").value,
          fee_component_name: this.FeeComponent.get("component_name").value,
          fees: this.FeeComponent.get("fees").value,
        };
        this.confirmationService.showUpdateConfirmDialog().then((result) => {
          if (result.value) {
            this.apiService
              .postTypeRequest("fee_component/update", Request_Data)
              .toPromise()
              .then((result: any) => {
                if (result.result) {
                  this.toster.warning("Data Updated");
                  this.confirmationService.showWarningMessage("Data Updated", result.message);
                  this.onClearForm();
                  this.ngOnInit();
                } else {
                  this.confirmationService.showErrorMessage("Cancelled!", result.message);
                }
              });
          } else {
            this.loader = false;
          }
        });
      } else {
        var div = {
          fee_group_id: this.FeeComponent.get("group_id").value,
          fee_component_name: this.FeeComponent.get("component_name").value,
          fees: this.FeeComponent.get("fees").value,
        };
        this.apiService.postTypeRequest("fee_component/insert", div).subscribe((result: any) => {
          if (result.result) {
            this.feeComponents = result.data;
            this.List = result.data;
            this.ngOnInit();
            this.toster.success("New Data Added");
            this.confirmationService.showSuccessMessage("Added!", result.message);
            this.onClearForm();
          } else {
            this.loader = false;
          }
        });
      }
    } else {
      this.toster.error("Cannot add empty value");
      this.loader = false;
    }
  }

  async onDelete(id: string) {
    var Request_Data = {
      fee_component_id: id,
    };
    this.confirmationService.showDeleteConfirmDialog().then((result) => {
      if (result.value) {
        this.apiService
          .postTypeRequest("fee_component/delete", Request_Data)
          .toPromise()
          .then((result: any) => {
            if (result.result) {
              this.toster.warning("Data deleted");
              this.confirmationService.showWarningMessage("Deleted!", result.message);
              this.ngOnInit();
            } else {
              this.confirmationService.showErrorMessage("Cancelled!", result.message);
            }
          });
      }
    });
  }

  showErrors() {
    for (var control in this.FeeComponent.controls) {
      if (this.FeeComponent.controls[control].invalid) {
        // console.log(control)
      }
    }
    this.FeeComponent.touched == true;
  }
}
