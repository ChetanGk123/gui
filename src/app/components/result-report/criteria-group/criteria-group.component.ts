import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { Table } from "primeng/table";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { ConfigCriteriaComponent } from "./config-criteria/config-criteria.component";
import { ManageCriteriaComponent } from "./manage-criteria/manage-criteria.component";

declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-criteria-group",
  templateUrl: "./criteria-group.component.html",
  styleUrls: ["./criteria-group.component.scss"],
})
export class CriteriaGroupComponent implements OnInit {
  Url: string = "POS_MAIN_CATEGORY";
  Title: string = "Main Category";
  loading: boolean;
  dialog: boolean = false;
  selectedProduct: any;
  items: MenuItem[];
  Data = [];
  constructor(public apiService: ApiService, private confirmationService: ConfirmationService, public messageService: MessageService, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getTypeRequest("new_table_data/RESULT_CRITERIA_GROUP").subscribe((result: any) => {
      this.Data = result.data;
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  add() {
    const ref = this.dialogService.open(ManageCriteriaComponent, {
      header: `Add New Criteria`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-8",
      data: {
        url: "register_new_item/",
        operation: "insert",
      },
    });

    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  edit(data: any) {
    const ref = this.dialogService.open(ManageCriteriaComponent, {
      header: `Edit Criteria`,
      styleClass: "w-8 sm:w-8 md:w-8 lg:w-6",
      data: {
        operation: "update",
        url: "update_item/",
        data: data,
      },
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  confirm(data: any) {
    // this.confirmationService.confirm({
    //   message: "Do you want to delete this record?",
    //   header: "Delete Confirmation",
    //   icon: "pi pi-info-circle",
    //   accept: () => {
    //     this.delete(data);
    //   },
    // });
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure, you want to Delete?",
        text: "Perviously registered data will be affected!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.delete(data);
        }
      });
  }

  delete(product: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    this.loading = true;
    var payload = { item_id: product.result_criteria_group_id };
    this.apiService
      .postTypeRequest(`delete_item/RESULT_CRITERIA_GROUP`, payload)
      .toPromise()
      .then((resopnse: any) => {
        if (resopnse.result) {
          this.ngOnInit();
        } else {
          this.loading = false;
          swalWithBootstrapButtons.fire("Cancelled", resopnse.message, "error");
        }
      })
      .catch((error: any) => {
        this.loading = false;
        // console.log(error.message);
      });
  }

  config(product: any) {
    const ref = this.dialogService.open(ConfigCriteriaComponent, {
      header: `Configure Criteria`,
      styleClass: "w-8 sm:w-8 md:w-8 lg:w-9",
      data: product,
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
}
