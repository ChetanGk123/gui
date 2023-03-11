import { Component, OnInit } from '@angular/core';
import { forkJoin,  Observable } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { MenuItem } from "primeng/api";
import { ConfirmationService } from "src/app/shared/services/confirmation_service/confirmation.service";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  loader: boolean = false;
  public issubjectsFilter: boolean = true;
  dataFetch: boolean = false;
  editIndex = -1;
  editValue: string;
  List: any[] = [];
  id: number;
  institution_id: number;
  subjects: any[] = [];
  filterValue: string = "";
  addValue: string = "";

  constructor(public apiService: ApiService, public spinner: SpinnerService, public toster: ToastrService, public confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loader = false;
    this.dataFetch = true;
    this.apiService.getTypeRequest("table_data/SUBJECT").subscribe((result: any) => {
      this.List = result.data;
      this.subjects = result.data;
      this.dataFetch = false;
    });
  }

  editClick(index, data) {
    this.editValue = data.name;
    this.editIndex = index;
  }

  onClear() {
    this.List = this.subjects;
  }

  update(data) {
    this.addValue = data.name;
    this.id = data.id;
    this.institution_id = data.institution_id;
  }

  onFilter(value) {
    this.editValue = value;
    this.List = [];
    this.subjects.filter((x) => {
      if (x.name.toLowerCase().includes(value.toLowerCase())) this.List.push(x);
    });
  }

  isValueAvailable() {
    // console.log(this.subjects);
    
    if(this.subjects != undefined && this.subjects.length > 0){
      var value = this.subjects.filter((x) => {
        if (x.name.toLowerCase() == this.addValue.toLowerCase()) return x;
      });
      return value.length > 0 ? false : true;
    } else{
      return true;
    }
  }

  onAddNew() {
    this.loader = true;
    if (this.addValue.length > 0 && this.id != null) {
      var Request_Data = {
        item_id: this.id,
        item_name: this.addValue,
      };
      this.confirmationService.showUpdateConfirmDialog().then((result) => {
        if (result.value) {
          this.apiService
            .postTypeRequest("subject_ops/update", Request_Data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data Updated");
                this.confirmationService.showWarningMessage("Data Updated", result.message);
                this.ngOnInit();
                this.Clear();
              } else {
                this.confirmationService.showErrorMessage("Cancelled!", result.message);

                this.loader = false;
              }
            });
        } else {
          this.loader = false;
        }
      });
    } else if (this.addValue.length > 0 && this.isValueAvailable()) {
      var div = {
        item_name: this.addValue,
      };
      this.apiService.postTypeRequest("subject_ops/insert", div).subscribe((result: any) => {
        if (result.result) {
          this.subjects = result.data;
          this.List = result.data;
          this.ngOnInit();
          this.Clear();
          this.toster.success("New Data Added");
          this.confirmationService.showSuccessMessage("Added", result.message);
        } else {
          this.loader = false;
        }
      });
      this.addValue = "";
    } else if (this.addValue.length > 0) {
      this.toster.error("Value alredy Exists");
      this.loader = false;
    } else {
      this.toster.error("Cannot add empty value");
      this.loader = false;
    }
  }

  Clear() {
    (this.addValue = ""), (this.id = null), (this.institution_id = null);
  }

  async onDelete(id: string) {
    var Request_Data = {
      item_id: id,
    };
    this.confirmationService.showDeleteConfirmDialog().then((result) => {
      if (result.value) {
        this.apiService
          .postTypeRequest("subject_ops/delete", Request_Data)
          .toPromise()
          .then((result: any) => {
            if (result.result) {
              this.toster.warning("Data deleted");
              this.confirmationService.showWarningMessage("Deleted", result.message);
              this.ngOnInit();
            } else {
              this.confirmationService.showErrorMessage("Cancelled!", result.message);
            }
          });
      }
    });
  }
}
