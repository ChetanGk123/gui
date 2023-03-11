import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-update-report",
  templateUrl: "./update-report.component.html",
  styleUrls: ["./update-report.component.scss"],
})
export class UpdateReportComponent implements OnInit {
  /* 
    {
      academic_id: 1;
      academic_name: "2022-23";
      class_id: 1;
      class_name: "UKG";
      department_id: 2;
      department_name: "Kannada";
      division_id: 2;
      division_name: "B";
      exam_date: "10-03-2023";
      report_id: 2;
      report_result_group_name: "Unit Test 1";
      result_criteria_group_id: 1;
      result_criteria_group_name: "C2";
      result_date: "31-03-2023";
      result_report_group_id: 2;
    }
  */
  commonForm: FormGroup = new FormGroup({
    report_id: new FormControl("", [Validators.required]),
    academic_id: new FormControl("", [Validators.required]),
    department_id: new FormControl("", [Validators.required]),
    class_id: new FormControl("", [Validators.required]),
    division_id: new FormControl("", [Validators.required]),
    result_report_group_id: new FormControl("", [Validators.required]),
    result_date: new FormControl("", [Validators.required]),
    exam_date: new FormControl("", [Validators.required]),
    result_criteria_group_id: new FormControl("", [Validators.required]),
    report_result_group_name: new FormControl("", [Validators.required]),
  });
  resultGroupList: any[] = [];
  criteriaGroupList: any[] = [];
  constructor(public config: DynamicDialogConfig, public toster: ToastrService,
    public ref: DynamicDialogRef, public apiService: ApiService,
    public datepipe: DatePipe,) {}

  ngOnInit(): void {
    // console.log(this.config.data);
    let result_date = new Date();
    result_date = this.config.data.data.result_date.split("-")
    let exam_date = new Date();
    exam_date = this.config.data.data.exam_date.split("-")
    if (this.config.data?.data) {
      this.commonForm.patchValue({
        report_id: this.config.data.data.report_id,
        academic_id: this.config.data.data.academic_id,
        department_id: this.config.data.data.department_id,
        class_id: this.config.data.data.class_id,
        division_id: this.config.data.data.division_id,
        result_report_group_id: this.config.data.data.result_report_group_id,
        result_date: this.datepipe.transform(new Date(result_date[2] + "/" + result_date[1] + "/" + result_date[0]), "yyyy-MM-dd"),
        exam_date: this.datepipe.transform(new Date(exam_date[2] + "/" + exam_date[1] + "/" + exam_date[0]), "yyyy-MM-dd"),
        result_criteria_group_id: this.config.data.data.result_criteria_group_id,
        report_result_group_name: this.config.data.data.report_result_group_name,
      });
      // console.log(this.commonForm.value);
      
    }
    this.resultGroupList = this.config.data.resultGroupList;
    this.criteriaGroupList = this.config.data.criteriaGroupList;
  }

  submit(){
    if(this.commonForm.valid){
      this.apiService.postTypeRequest("result_report_master_ops/update",this.commonForm.value)
      .toPromise()
        .then((result: any) => {
          if(result.result){
            this.toster.success(result.message)
            this.ref.close(true);
          } else{
            this.toster.error(result.message)
          }
        })
    } else {
      var controls = this.commonForm.controls;
            for (const name in controls) {
                controls[name].markAsDirty();
                controls[name].markAllAsTouched();
            }
    }
  }

  cancel(){
    this.ref.close('');
  }
}
