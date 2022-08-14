import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { ConfirmationService } from "src/app/shared/services/confirmation_service/confirmation.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";

@Component({
  selector: "app-blood-group",
  templateUrl: "./blood-group.component.html",
  styleUrls: ["./blood-group.component.scss"],
})
export class BloodGroupComponent implements OnInit {
  public isBloodFilter: boolean = true;
  public addLoader: boolean = false;
  bloodeditValue: string;
  dataFetch: boolean = false;
  bloodeditIndex = -1;
  bloodList: any = [];
  blood: any = [];

  constructor(public apiService: ApiService, private dialog: DialogService, public spinner: SpinnerService, public toster: ToastrService, public confirmationService: ConfirmationService, public dialogRef: MatDialogRef<BloodGroupComponent>) {}

  ngOnInit(): void {
    this.clear();
    this.dataFetch = true;
    this.addLoader = false;
    this.apiService.getTypeRequest("dropdown_data/BLOOD_GROUP").subscribe((result: any) => {
      this.bloodList = result.data;
      this.blood = result.data;
      this.dataFetch = false;
    });
  }

  clear() {
    this.bloodeditValue = "";
  }

  bloodeditClick(index, data) {
    this.bloodeditValue = data.name;
    this.bloodeditIndex = index;
  }

  updateBlood(data) {
    this.addLoader = true;
    this.dataFetch = true;
    var Request_Data = {
      item_id: data,
      item_name: this.bloodeditValue,
    };

    this.confirmationService.showUpdateConfirmDialog().then((result) => {
      if (result.value) {
        this.apiService
          .postTypeRequest("update_item/BLOOD_GROUP", Request_Data)
          .toPromise()
          .then((result: any) => {
            if (result.result) {
              this.toster.warning("Data Updated");
              this.confirmationService.showSuccessMessage("Data Updated", result.message);
              this.ngOnInit();
            } else {
              this.confirmationService.showErrorMessage("Cancelled!", result.message);

              this.addLoader = false;
              this.dataFetch = false;
            }
          });
      } else {
        this.addLoader = false;
        this.dataFetch = false;
      }
    });
    this.bloodeditIndex = -1;
    this.dialogRef.close(true);
  }

  onBloodFilter(value) {
    this.bloodeditValue = value;
    this.bloodList = [];
    this.blood.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase())) this.bloodList.push(x);
    });
  }

  onAddNewBlood() {
    this.addLoader = true;
    this.dataFetch = true;
    if (this.bloodeditValue.length > 0) {
      var blood = {
        item_name: this.bloodeditValue,
      };
      this.apiService.postTypeRequest("register_new_item/BLOOD_GROUP", blood).subscribe((result: any) => {
        if (result.result) {
          this.blood = result.data;
          this.bloodList = result.data;
          this.ngOnInit();
          this.toster.success("New Data Added");
          this.confirmationService.showSuccessMessage("Added", result.message);
        } else {
          this.addLoader = false;
          this.dataFetch = false;
        }
      });
    }
    this.bloodeditValue = "";
    this.dialogRef.close(true);
  }

  async onDeleteBlood(id: string) {
    this.dataFetch = true;
    var Request_Data = {
      item_id: id,
    };
    this.confirmationService.showDeleteConfirmDialog().then((result) => {
      if (result.value) {
        this.apiService
          .postTypeRequest("delete_item/BLOOD_GROUP", Request_Data)
          .toPromise()
          .then((result: any) => {
            if (result.result) {
              this.toster.warning("Data deleted");
              this.confirmationService.showWarningMessage("Deleted", result.message);
              this.ngOnInit();
            } else {
              this.confirmationService.showErrorMessage("Cancelled!", result.message);

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
