import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
declare var require;
const Swal = require("sweetalert2");
@Component({
  selector: "app-academic-year",
  templateUrl: "./academic-year.component.html",
  styleUrls: ["./academic-year.component.scss"],
})
export class AcademicYearComponent implements OnInit {
  public isAYFilter: boolean = true;
  public checked: boolean = true;
  public updateLoader: boolean = false;
  public addLoader: boolean = false;
  dataFetch: boolean = false;
  ayeditIndex = -1;
  active_ay;
  old_active_ay = -1;
  ayeditValue: string;
  ayList: any = [];
  ay: any = [];

  constructor(
    public apiService: ApiService,
    private dialog: DialogService,
    public spinner: SpinnerService,
    public toster: ToastrService,
    public dialogRef: MatDialogRef<AcademicYearComponent>
  ) {}

  ngOnInit(): void {
    this.clear();
    this.dataFetch = true;
    this.updateLoader = false;
    this.addLoader = false;
    this.ayeditValue = "";
    this.apiService
      .getTypeRequest("dropdown_data/ACADEMIC_YEAR")
      .subscribe((result: any) => {
        this.ayList = result.data;
        this.ay = result.data;
        this.ay.map((element) => {
          if (element.status == 1) {
            this.active_ay = element.id;
            this.old_active_ay = element.id;
          }
        });
        this.dataFetch = false;
      });
  }

  ayeditClick(index, data) {
    this.ayeditValue = data.name;
    this.ayeditIndex = index;
  }

  updateAy(data) {
    this.addLoader = true;
    this.dataFetch = true;
    var Request_Data = {
      item_id: data,
      item_name: this.ayeditValue,
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
            .postTypeRequest("update_item/ACADEMIC_YEAR", Request_Data)
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
                this.ayeditValue = "";
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
    this.ayeditIndex = -1;
    this.dialogRef.close(true);
  }

  UpdateAy() {
    this.dataFetch = true;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    var data = {
      academic_year_id: this.active_ay.id,
      status: this.active_ay.status == 1 ? 0 : 1,
    };

    this.apiService
      .postTypeRequest("update_academic_status", data)
      .subscribe((result: any) => {
        if (result.result) {
          this.toster.success("Updates Academic Year");
          swalWithBootstrapButtons.fire("Updated!", result.message, "success");
        } else {
          this.toster.error(result.message);
          this.updateLoader = false;
        }
        this.ngOnInit();
      });
  }

  onAyFilter(value) {
    this.ayeditValue = value;
    this.ayList = [];
    this.ay.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase()))
        this.ayList.push(x);
    });
  }

  onAddNewAy() {
    this.addLoader = true;
    this.dataFetch = true;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (this.ayeditValue.length > 0) {
      var div = {
        item_name: this.ayeditValue,
      };
      this.apiService
        .postTypeRequest("register_new_item/ACADEMIC_YEAR", div)
        .subscribe((result: any) => {
          if (result.result) {
            this.ay = result.data;
            this.ayList = result.data;
            this.ngOnInit();
            this.ayeditValue = "";
            this.toster.success("New Data Added");
            swalWithBootstrapButtons.fire("Added!", result.message, "success");
          } else {
            this.toster.error(result.message);
            this.addLoader = false;
            this.dataFetch = false;
          }
        });
    }
    this.ayeditValue = "";
    this.dialogRef.close(true);
  }

  async onDeleteAy(id: string) {
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
            .postTypeRequest("delete_item/ACADEMIC_YEAR", Request_Data)
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

  clear(){
    this.ayeditValue = "";
  }
}
