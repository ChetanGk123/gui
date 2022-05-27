import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"],
})
export class DepartmentComponent implements OnInit {
  public isDepFilter: boolean = true;
  public addLoader: boolean = false;
  DepeditIndex = -1;
  dataFetch: boolean = false;
  DepeditValue: string;
  DepCodeeditValue: string;
  DepList: any = [];
  dep: any = [];

  constructor(
    public apiService: ApiService,
    private dialog: DialogService,
    public spinner: SpinnerService,
    public toster: ToastrService,
    public dialogRef: MatDialogRef<DepartmentComponent>
  ) {}

  ngOnInit(): void {
    this.clear();
    this.dataFetch = true;
    this.addLoader = false;
    this.DepeditValue = "";
    this.DepCodeeditValue = "";
    this.apiService
      .getTypeRequest("dropdown_data/DEPARTMENT")
      .subscribe((result: any) => {
        this.DepList = result.data;
        this.dep = result.data;
        this.dataFetch = false;
      });
  }

  clear() {
    this.DepeditValue = "";
    this.DepCodeeditValue = "";
  }

  DepeditClick(index, data) {
    this.DepeditValue = data.name;
    this.DepCodeeditValue = data.dept_code;
    this.DepeditIndex = index;
  }

  updateDep(data) {
    this.addLoader = true;
    this.dataFetch = true;
    var Request_Data = {
      dept_id: data,
      dept_name: this.DepeditValue,
      dept_code: this.DepCodeeditValue,
    };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure, you want to Update?",
        text: "Perviously registered data will be affected!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.apiService
            .postTypeRequest("update_dept", Request_Data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data Updated");
                swalWithBootstrapButtons.fire(
                  "Updated!",
                  result.message,
                  "success"
                );
                this.ngOnInit();
              } else {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  result.message,
                  "error"
                );
                this.toster.error(result.message);
                this.addLoader = false;
                this.dataFetch = false;
              }
            });
        } else {
          this.addLoader = false;
          this.dataFetch = false;
        }
      });
    this.DepeditIndex = -1;
    this.dialogRef.close(true);
  }

  onDepFilter(value) {
    //this.DepeditValue = value;
    this.DepList = [];
    this.dep.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase()))
        this.DepList.push(x);
    });
  }
  onDepCodeFilter(value) {
    //this.DepeditValue = value;
    this.DepList = [];
    this.dep.filter((x) => {
      if (x.dept_code.toLowerCase().includes(value.toLowerCase()))
        this.DepList.push(x);
    });
  }

  onAddNewDep() {
    this.addLoader = true;
    this.dataFetch = true;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (this.DepeditValue.length > 0 && this.DepCodeeditValue.length > 0) {
      var castData = {
        dept_name: this.DepeditValue,
        dept_code: this.DepCodeeditValue,
      };
      this.apiService
        .postTypeRequest("register_dept", castData)
        .subscribe((result: any) => {
          if (result.result) {
            this.DepList = result.data;
            this.dep = result.data;
            this.ngOnInit();
            this.toster.success("New Data Added");
            swalWithBootstrapButtons.fire("Added!", result.message, "success");
          } else {
            this.toster.error(result.message);
            this.addLoader = false;
            this.dataFetch = false;
          }
        });
    }
    this.DepeditValue = "";
    this.dialogRef.close(true);
  }

  async onDeleteDep(id: string) {
    this.dataFetch = true;
    var Request_Data = {
      item_id: id,
    };
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
          this.apiService
            .postTypeRequest("delete_item/DEPARTMENT", Request_Data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data deleted");
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  result.message,
                  "success"
                );
                this.ngOnInit();
              } else {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  result.message,
                  "error"
                );
                this.toster.error(result.message);
                this.addLoader = false;
                this.dataFetch = false;
              }
            });
        } else {
          this.addLoader = false;
          this.dataFetch = false;
        }
      });
  }
}
