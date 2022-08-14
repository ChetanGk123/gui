import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
declare var require;
const Swal = require("sweetalert2");
@Component({
  selector: "app-doc",
  templateUrl: "./doc.component.html",
  styleUrls: ["./doc.component.scss"],
})
export class DocComponent implements OnInit {
  public isDocFilter: boolean = true;
  public addLoader: boolean = false;
  docditIndex = -1;
  dataFetch: boolean = false;
  docditValue: string;
  docList: any = [];
  doc: any = [];
  constructor(public apiService: ApiService, private dialog: DialogService, public spinner: SpinnerService, public toster: ToastrService, public dialogRef: MatDialogRef<DocComponent>) {}

  ngOnInit(): void {
    this.clear();
    this.dataFetch = true;
    this.addLoader = false;
    this.apiService.getTypeRequest("dropdown_data/DOCUMENT").subscribe((result: any) => {
      this.docList = result.data;
      this.doc = result.data;
      this.dataFetch = false;
    });
  }

  clear() {
    this.docditValue = "";
  }

  docditClick(index, data) {
    this.docditValue = data.name;
    this.docditIndex = index;
  }

  updateDoc(data) {
    this.addLoader = true;
    this.dataFetch = true;
    var Request_Data = {
      item_id: data,
      item_name: this.docditValue,
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
            .postTypeRequest("update_item/DOCUMENT", Request_Data)
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
    this.docditIndex = -1;
    this.dialogRef.close(true);
  }

  onDocFilter(value) {
    this.docditValue = value;
    this.docList = [];
    this.doc.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase())) this.docList.push(x);
    });
  }

  onAddNewDoc() {
    this.addLoader = true;
    this.dataFetch = true;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (this.docditValue.length > 0) {
      var doc = {
        item_name: this.docditValue,
      };
      this.apiService.postTypeRequest("register_new_item/DOCUMENT", doc).subscribe((result: any) => {
        if (result.result) {
          this.doc = result.data;
          this.docList = result.data;
          this.ngOnInit();
          this.toster.success("New Data Added");
          swalWithBootstrapButtons.fire("Added!", result.message, "success");
        } else {
          this.addLoader = false;
          this.dataFetch = false;
        }
      });
    }
    this.docditValue = "";
    this.dialogRef.close(true);
  }

  async onDeleteDoc(id: string) {
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
            .postTypeRequest("delete_item/DOCUMENT", Request_Data)
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
