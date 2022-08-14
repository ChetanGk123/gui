import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
declare var require;
const Swal = require("sweetalert2");
@Component({
  selector: "app-religion",
  templateUrl: "./religion.component.html",
  styleUrls: ["./religion.component.scss"],
})
export class ReligionComponent implements OnInit {
  public isReligionFilter: boolean = true;
  public addLoader: boolean = true;
  religioneditIndex = -1;
  dataFetch: boolean = false;
  religioneditValue: string;
  religionList: any = [];
  religion: any = [];
  constructor(public apiService: ApiService, private dialog: DialogService, public spinner: SpinnerService, public toster: ToastrService, public dialogRef: MatDialogRef<ReligionComponent>) {}

  ngOnInit(): void {
    this.clear();
    this.dataFetch = true;
    this.addLoader = false;
    this.apiService.getTypeRequest("dropdown_data/RELIGION").subscribe((result: any) => {
      this.religionList = result.data;
      this.religion = result.data;
      this.dataFetch = false;
    });
  }

  religioneditClick(index, data) {
    this.religioneditValue = data.name;
    this.religioneditIndex = index;
  }

  updateReligion(data) {
    this.addLoader = true;
    this.dataFetch = true;
    var Religion = {
      item_id: data,
      item_name: this.religioneditValue,
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
            .postTypeRequest("update_item/RELIGION", Religion)
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
    this.religioneditIndex = -1;
    this.dialogRef.close(true);
  }

  onReligionFilter(value) {
    this.religioneditValue = value;
    this.religionList = [];
    this.religion.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase())) this.religionList.push(x);
    });
  }

  clear() {
    this.religioneditValue = "";
  }

  onAddNewReligion() {
    this.addLoader = true;
    this.dataFetch = true;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (this.religioneditValue.length > 0) {
      var religion = {
        item_name: this.religioneditValue,
      };
      this.apiService.postTypeRequest("register_new_item/RELIGION", religion).subscribe((result: any) => {
        if (result.result) {
          this.religion = result.data;
          this.religionList = result.data;
          this.ngOnInit();
          this.toster.success("New Data Added");
          swalWithBootstrapButtons.fire("Added!", result.message, "success");
          this.dialogRef.close(true);
        } else {
          this.addLoader = false;
          this.dataFetch = false;
        }
      });
    }
    this.religioneditValue = "";
  }

  async onDeleteReligion(id: string) {
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
            .postTypeRequest("delete_item/RELIGION", Request_Data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data deleted");
                swalWithBootstrapButtons.fire("Deleted!", result.message, "success");
                this.ngOnInit();
              } else {
                swalWithBootstrapButtons.fire("Cancelled", result.message, "error");

                this.dataFetch = false;
                this.addLoader = false;
              }
            });
        } else {
          this.addLoader = false;
          this.dataFetch = false;
        }
      });
  }
}
