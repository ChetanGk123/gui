import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { ConfirmationService } from "src/app/shared/services/confirmation_service/confirmation.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";

export interface cast {
  id: number;
  name: string;
  sr: string;
}
@Component({
  selector: "app-caste",
  templateUrl: "./caste.component.html",
  styleUrls: ["./caste.component.scss"],
})
export class CasteComponent implements OnInit {
  public isCasteFilter: boolean = true;
  casteditIndex = -1;
  dataFetch: boolean = false;
  public addLoader: boolean = false;
  casteeditValue: string;
  casteList: any = [];
  casts: any = [];

  constructor(public apiService: ApiService, private dialog: DialogService, public spinner: SpinnerService, public toster: ToastrService, public confirmationService: ConfirmationService, public dialogRef: MatDialogRef<CasteComponent>) {}

  ngOnInit() {
    this.clear();
    this.dataFetch = true;
    this.addLoader = false;
    this.apiService.getTypeRequest("dropdown_data/CASTE").subscribe((result: any) => {
      this.casteList = result.data;
      this.casts = result.data;
      this.dataFetch = false;
    });
  }

  clear() {
    this.casteeditValue = "";
  }

  casteditClick(index, data) {
    this.casteeditValue = data.name;
    this.casteditIndex = index;
  }

  updateCaste(data) {
    this.addLoader = true;
    this.dataFetch = true;
    var Request_Data = {
      item_id: data,
      item_name: this.casteeditValue,
    };
    this.confirmationService.showUpdateConfirmDialog().then((result) => {
      if (result.value) {
        this.apiService
          .postTypeRequest("update_item/CASTE", Request_Data)
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
    this.casteditIndex = -1;
    this.dialogRef.close(true);
  }

  onCasteFilter(value) {
    this.casteeditValue = value;
    this.casteList = [];
    this.casts.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase())) this.casteList.push(x);
    });
  }

  onAddNewCaste() {
    this.addLoader = true;
    this.dataFetch = true;
    if (this.casteeditValue.length > 0) {
      var castData = {
        item_name: this.casteeditValue,
      };
      this.apiService.postTypeRequest("register_new_item/CASTE", castData).subscribe((result: any) => {
        if (result.result) {
          this.casteList = result.data;
          this.casts = result.data;
          this.ngOnInit();
          this.toster.success("New Data Added");
          this.confirmationService.showSuccessMessage("Added", result.message);
          this.dialogRef.close(true);
        } else {
          this.addLoader = false;
          this.dataFetch = false;
        }
      });
    }
    this.casteeditValue = "";
  }

  async onDeleteCaste(id: string) {
    this.dataFetch = true;
    var Request_Data = {
      item_id: id,
    };
    this.confirmationService.showDeleteConfirmDialog().then((result) => {
      if (result.value) {
        this.apiService
          .postTypeRequest("delete_item/CASTE", Request_Data)
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
