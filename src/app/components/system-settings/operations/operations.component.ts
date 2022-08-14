import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
declare var require;
const Swal = require("sweetalert2");

@Component({
  templateUrl: "./operations.component.html",
  styleUrls: ["./operations.component.scss"],
})
export class OperationsComponent implements OnInit {
  editIndex = -1;
  dataFetch: boolean = false;
  editValue: string;
  List: any = [];
  dataList: any = [];
  moduleList: any[] = [];
  constructor(public apiService: ApiService, private dialog: DialogService, public spinner: SpinnerService, public toster: ToastrService, public dialogRef: MatDialogRef<OperationsComponent>, @Inject(MAT_DIALOG_DATA) public dialogdata: any) {}

  ngOnInit(): void {
    this.dataFetch = true;
    this.apiService.getTypeRequest("gui_options").subscribe((result: any) => {
      this.moduleList = result.data.modules;
      this.moduleList.forEach((element) => {
        if (element.children.length > 0) {
          element.children.forEach((child) => {
            if (child.component_id == this.dialogdata.main_component_id) {
              this.List = child.permissions;
            }
          });
        }
      });
      this.dataFetch = false;
    });
  }

  editClick(index, data) {
    this.editValue = data.operation_name;
    this.editIndex = index;
  }

  update(value) {
    var m_id = this.dialogdata.main_component_id ?? "";
    var s_id = this.dialogdata.sub_component_id ?? "";
    var data = {
      operation_id: value,
      main_component_id: m_id,
      sub_component_id: s_id,
      operation_name: this.editValue,
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
            .postTypeRequest("component_operations/update", data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data Updated");
                swalWithBootstrapButtons.fire("Updated!", result.message, "success");
                this.ngOnInit();
              } else {
                swalWithBootstrapButtons.fire("Cancelled", result.message, "error");
              }
            });
        }
      });
    this.dialogRef.close(true);
    this.editIndex = -1;
  }

  onFilter(value) {
    this.editValue = value;
    this.List = [];
    this.dataList.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase())) this.List.push(x);
    });
  }

  onAddNew() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (this.editValue.length > 0) {
      var m_id = this.dialogdata.main_component_id ?? "";
      var s_id = this.dialogdata.sub_component_id ?? "";
      var data = {
        main_component_id: m_id,
        sub_component_id: s_id,
        operation_name: this.editValue,
      };

      this.apiService.postTypeRequest("component_operations/insert", data).subscribe((result: any) => {
        if (result.result) {
          this.dataList = result.data;
          this.List = result.data;
          this.ngOnInit();
          this.toster.success("New Data Added");
          swalWithBootstrapButtons.fire("Added!", result.message, "success");
        } else {
        }
      });
    }
    this.editValue = "";
  }

  async onDelete(id: string) {
    var Request_Data = {
      operation_id: id,
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
            .postTypeRequest("component_operations/delete", Request_Data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data deleted");
                swalWithBootstrapButtons.fire("Deleted!", result.message, "success");
                this.ngOnInit();
              } else {
                swalWithBootstrapButtons.fire("Cancelled", result.message, "error");
              }
            });
        }
      });
  }
}
