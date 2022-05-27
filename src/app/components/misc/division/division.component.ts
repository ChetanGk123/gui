import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
declare var require;
const Swal = require("sweetalert2");
@Component({
  selector: "app-division",
  templateUrl: "./division.component.html",
  styleUrls: ["./division.component.scss"],
})
export class DivisionComponent implements OnInit {
  public isDivFilter: boolean = true;
  public addLoader: boolean = false;
  diveditIndex = -1;
  dataFetch: boolean = false;
  diveditValue: string;
  divList: any = [];
  div: any = [];

  constructor(
    public apiService: ApiService,
    private dialog: DialogService,
    public spinner: SpinnerService,
    public toster: ToastrService,
    public dialogRef: MatDialogRef<DivisionComponent>
  ) {}

  ngOnInit(): void {
    this.clear();
    this.dataFetch = true;
    this.addLoader = false;
    this.apiService
      .getTypeRequest("dropdown_data/DIVISION")
      .subscribe((result: any) => {
        this.divList = result.data;
        this.div = result.data;
        this.dataFetch = false;
      });
  }

  clear() {
    this.diveditValue = "";
  }

  diveditClick(index, data) {
    this.diveditValue = data.name;
    this.diveditIndex = index;
  }

  updateDiv(data) {
    this.addLoader = true;
    this.dataFetch = true;
    var Request_Data = {
      item_id: data,
      item_name: this.diveditValue,
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
            .postTypeRequest("update_item/DIVISION", Request_Data)
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
    this.diveditIndex = -1;
    this.dialogRef.close(true);
  }

  onDivFilter(value) {
    this.diveditValue = value;
    this.divList = [];
    this.div.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase()))
        this.divList.push(x);
    });
  }

  onAddNewDiv() {
    this.addLoader = true;
    this.dataFetch = true;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (this.diveditValue.length > 0) {
      var div = {
        item_name: this.diveditValue,
      };
      this.apiService
        .postTypeRequest("register_new_item/DIVISION", div)
        .subscribe((result: any) => {
          if (result.result) {
            this.div = result.data;
            this.divList = result.data;
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
    this.diveditValue = "";
    this.dialogRef.close(true);
  }

  async onDeleteDiv(id: string) {
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
            .postTypeRequest("delete_item/DIVISION", Request_Data)
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
