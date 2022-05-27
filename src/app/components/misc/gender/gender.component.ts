import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
declare var require;
const Swal = require("sweetalert2");
@Component({
  selector: "app-gender",
  templateUrl: "./gender.component.html",
  styleUrls: ["./gender.component.scss"],
})
export class GenderComponent implements OnInit {
  public isGenderFilter: boolean = true;
  public addLoader: boolean = true;
  genderditIndex = -1;
  dataFetch: boolean = false;
  gendereditValue: string;
  genderList: any = [];
  gender: any = [];

  constructor(
    public apiService: ApiService,
    private dialog: DialogService,
    public spinner: SpinnerService,
    public toster: ToastrService,
    public dialogRef: MatDialogRef<GenderComponent>
  ) {}

  ngOnInit(): void {
    this.clear();
    this.dataFetch = true;
    this.addLoader = false;
    this.apiService
      .getTypeRequest("dropdown_data/GENDER")
      .subscribe((result: any) => {
        this.genderList = result.data;
        this.gender = result.data;
        this.dataFetch = false;
      });
  }

  clear() {
    this.gendereditValue = "";
  }

  genderditClick(index, data) {
    this.gendereditValue = data.name;
    this.genderditIndex = index;
  }

  updateGender(data) {
    this.addLoader = true;
    this.dataFetch = true;
    var castData = {
      item_id: data,
      item_name: this.gendereditValue,
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
            .postTypeRequest("update_item/GENDER", castData)
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
    this.genderditIndex = -1;
    this.dialogRef.close(true);
  }

  onGenderFilter(value) {
    this.gendereditValue = value;
    this.genderList = [];
    this.gender.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase()))
        this.genderList.push(x);
    });
  }

  onAddNewGender() {
    this.addLoader = true;
    this.dataFetch = true;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    if (this.gendereditValue.length > 0) {
      var castData = {
        item_name: this.gendereditValue,
      };
      this.apiService
        .postTypeRequest("register_new_item/GENDER", castData)
        .subscribe((result: any) => {
          if (result.result) {
            this.genderList = result.data;
            this.gender = result.data;
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
    this.gendereditValue = "";
    this.dialogRef.close(true);
  }

  async onDeleteGender(id: string) {
    this.dataFetch = true;
    var Request_Data = {
      item_id: id,
    };
    //    this.apiService.postTypeRequest('delete_item/GENDER',Request_Data).toPromise().then((result:any) =>{
    //      if(result.result){
    //        this.toster.warning('Data deleted');
    //        this.ngOnInit();
    //      }
    //      else{
    //       this.toster.error(result.message)
    //     }
    //    })
    // }
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
            .postTypeRequest("delete_item/GENDER", Request_Data)
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
                this.toster.warning(result.message);
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
