import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";

declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {

  public isFilter: boolean = true;
  public addLoader: boolean = false;
  editIndex = -1;
  dataFetch: boolean = false;
  editValue: string;
  dataList: any = [];
  data: any = [];
  constructor(public apiService: ApiService, private dialog: DialogService, public spinner: SpinnerService, public toster: ToastrService) { }

  ngOnInit(): void {
    this.clear();
    this.dataFetch = true;
    this.addLoader = false;
    this.apiService.getTypeRequest("new_table_data/RESULT_REPORT_GROUP").subscribe((result: any) => {
      this.dataList = result.data;
      this.data = result.data;
      this.dataFetch = false;
    });
  }

  clear() {
    this.editValue = "";
  }

  editClick(index, data) {
    this.editValue = data.result_report_group_name;
    this.editIndex = index;
  }

  update(data) {
    this.addLoader = true;
    this.dataFetch = true;
    var Request_Data = {
      item_id: data,
      item_name: this.editValue,
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
            .postTypeRequest("update_item/RESULT_REPORT_GROUP", Request_Data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data Updated");
                swalWithBootstrapButtons.fire("Updated!", result.message, "success");
                this.ngOnInit();
              } else {
                swalWithBootstrapButtons.fire("Cancelled", result.message, "error");

                this.addLoader = false;
                this.dataFetch = false;
              }
            });
        } else {
          this.addLoader = false;
          this.dataFetch = false;
        }
      });
    this.editIndex = -1;
  }

  onFilter(value) {
    this.editValue = value;
    this.dataList = [];
    this.data.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase())) this.dataList.push(x);
    });
  }

  onAddNew() {
    this.addLoader = true;
    this.dataFetch = true;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (this.editValue.length > 0) {
      var data = {
        item_name: this.editValue,
      };
      this.apiService.postTypeRequest("register_new_item/RESULT_REPORT_GROUP", data).subscribe((result: any) => {
        if (result.result) {
          this.data = result.data;
          this.dataList = result.data;
          this.ngOnInit();
          this.toster.success("New Data Added");
          swalWithBootstrapButtons.fire("Added!", result.message, "success");
        } else {
          this.addLoader = false;
          this.dataFetch = false;
        }
      });
    }
    this.editValue = "";
  }

  async onDelete(id: string) {
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
            .postTypeRequest("delete_item/RESULT_REPORT_GROUP", Request_Data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data deleted");
                swalWithBootstrapButtons.fire("Deleted!", result.message, "success");
                this.ngOnInit();
              } else {
                swalWithBootstrapButtons.fire("Cancelled", result.message, "error");

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
