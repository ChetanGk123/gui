import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-config-criteria",
  templateUrl: "./config-criteria.component.html",
  styleUrls: ["./config-criteria.component.scss"],
})
export class ConfigCriteriaComponent implements OnInit {
  result_criteria_group_id;
  failCondidtion;
  criteriaList: any[] = [];
  dataFetch: boolean = false;
  commonForm: FormGroup = new FormGroup({
    criteria_id: new FormControl(""),
    criteria_name: new FormControl("", [Validators.required]),
    min_marks: new FormControl("", [Validators.required]),
    max_marks: new FormControl("", [Validators.required]),
    grade: new FormControl("", [Validators.required]),
    isFailCondidtion: new FormControl(false, [Validators.required]),
  });

  constructor(public config: DynamicDialogConfig, public apiService: ApiService) {}

  ngOnInit(): void {
    // console.log(this.config.data);
    this.criteriaList = []
    if (this.config.data) {
      this.dataFetch = true;
      this.result_criteria_group_id = this.config.data.result_criteria_group_id;
      this.apiService.getTypeRequest(`specific_table_data/RESULT_CRITERIA_BY_GROUP_ID/${this.result_criteria_group_id}`).subscribe((result: any) => {
        if(result.result){
          result.data.forEach((element) => {
            var data = {
              criteria_id:element.criteria_id,
              criteria_name: element.criteria_name,
              max_marks: element.max_marks,
              min_marks: element.min_marks,
              grade: element.grade,
              isFailCondidtion: element.isFailCondidtion == 1?true:false,
            };
            this.criteriaList.push(data)
          });
        }
        this.dataFetch = false;
      })
    }
  }

  onRowEditInit(product: any) {
  }

  onRowEditSave(product: any) {
    // console.log(product);
    var data = {
      result_criteria_group_id: this.result_criteria_group_id,
      criteria_id:product.criteria_id,
      criteria_name: product.criteria_name,
      max_marks: product.max_marks,
      min_marks: product.min_marks,
      grade: product.grade,
      isFailCondidtion: product.isFailCondidtion ? "1" : "0",
    };
    this.apiService.postTypeRequest("result_criteria_ops/update", data).subscribe((result: any) => {
      if (result.result) {
        this.ngOnInit();
      }
    });
  }

  onRowDelete(product){
    var data = {
      criteria_id:product.criteria_id,
    };
    this.apiService.postTypeRequest("result_criteria_ops/delete", data).subscribe((result: any) => {
      if (result.result) {
        this.ngOnInit();
      }
    });
  }

  submit() {
    // console.log(this.commonForm.value);
    if (this.commonForm.valid) {
      var data = {
        criteria_name: this.commonForm.controls.criteria_name.value,
        max_marks: this.commonForm.controls.max_marks.value,
        min_marks: this.commonForm.controls.min_marks.value,
        grade: this.commonForm.controls.grade.value,
        isFailCondidtion: this.commonForm.controls.isFailCondidtion.value ? "1" : "0",
      };
      var payload = {
        result_criteria_group_id: this.result_criteria_group_id,
        criteria: [data],
      };
      this.apiService.postTypeRequest("result_criteria_ops/insert", payload).subscribe((result: any) => {
        if (result.result) {
          this.ngOnInit();
        }
      });
    } else {
      var controls = this.commonForm.controls;
            for (const name in controls) {
                controls[name].markAsDirty();
                controls[name].markAllAsTouched();
            }
    }
  }

  getFailCondidtion(data: any) {
    this.failCondidtion = data == 1 ? true : false;
  }
  cancel() {}
}
