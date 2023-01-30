import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-config-report",
  templateUrl: "./config-report.component.html",
  styleUrls: ["./config-report.component.scss"],
})
export class ConfigReportComponent implements OnInit {
  public dataFetch: boolean = false;
  public enableEditButton: boolean = false;
  editMarks: boolean = false;
  assignedSubjectList = [];
  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  divisionList: any[] = [];
  mappedSubjects: any[] = [];
  subject_allocation_ids: any[] = [];
  marks_array: any[] = [];
  updateSubjectMarksID
  Loading: boolean = false;
  commonForm: FormGroup = new FormGroup({
    report_id: new FormControl("", [Validators.required]),
    academic_id: new FormControl("", [Validators.required]),
    department_id: new FormControl("", [Validators.required]),
    class_id: new FormControl("", [Validators.required]),
    division_id: new FormControl("", [Validators.required]),
    subject_ids: new FormControl([]),
    subject_id: new FormControl([]),
    marks_allocation_id: new FormControl(),
  });

  constructor(public datepipe: DatePipe, public config: DynamicDialogConfig, public apiService: ApiService, public toster: ToastrService, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    console.log(this.config.data);
    this.commonForm.patchValue({
      report_id: this.config.data.data.report_id ?? "",
      academic_id: this.config.data.data.academic_id ?? "",
      department_id: this.config.data.data.department_id ?? "",
      class_id: this.config.data.data.class_id ?? "",
      division_id: this.config.data.data.division_id ?? "",
    });
    console.log(this.commonForm.value);

    this.config.data.academic_attributes_tree.forEach((academinYear) => {
      if (academinYear.department_data.length > 0) {
        var academicData = {
          academic_year_id: academinYear.academic_year_id,
          academic_year_name: academinYear.academic_year_name,
        };
        this.academinYearList.push(academicData);
      }
      academinYear.department_data.forEach((department) => {
        department.class_data.forEach((clas) => {
          clas.division_data.forEach((division) => {
            var data = {
              academic_id: academinYear.academic_year_id,
              academic_name: academinYear.academic_year_name,
              department_id: department.department_id,
              department_name: department.department_name,
              class_id: clas.class_id,
              class_name: clas.class_name,
              division_id: division.division_id,
              division_name: division.division_name,
            };
            this.mappedSubjects.push(data);
          });
        });
      });
      this.getDepartments();
      this.getClasses();
      this.getDivisions();
    });
    this.getReportData();
  }

  checkForm(data: any) {
    if (this.commonForm.valid) {
      this.getSubjects();
    }
  }

  getDepartments() {
    for (const academic_year of this.config.data.academic_attributes_tree) {
      if (academic_year.academic_year_id == this.commonForm.controls.academic_id.value) {
        this.departmentList = [];
        academic_year.department_data.forEach((department) => {
          this.departmentList.push(department);
        });
        break;
      }
    }
  }
  getClasses() {
    for (const department of this.departmentList) {
      if (department.department_id == this.commonForm.controls.department_id.value) {
        this.classList = [];
        department.class_data.forEach((clas) => {
          this.classList.push(clas);
        });
        break;
      }
    }
  }
  getDivisions() {
    for (const clas of this.classList) {
      if (clas.class_id == this.commonForm.controls.class_id.value) {
        this.divisionList = [];
        clas.division_data.forEach((division) => {
          this.divisionList.push(division);
        });
        break;
      }
    }
  }

  getSubjects() {
    this.editMarks = false;
    this.enableEditButton = false
    if (this.commonForm.valid) {
      this.assignedSubjectList = [];
      this.dataFetch = true;
      this.apiService
        .postTypeRequest("subject_allocation_data", this.commonForm.value)
        .toPromise()
        .then((result: any) => {
          if (result.result) {
            this.assignedSubjectList = result.data;
            console.log(this.assignedSubjectList);
            for (const iterator of this.assignedSubjectList) {
              if(iterator.max_marks == null){
                this.enableEditButton = true;
                break
              }
              else{
              }
            } 
          }
        })
        .finally(() => {
          this.dataFetch = false;
        });
    } else {
      this.commonForm.markAllAsTouched();
    }
  }

  getReportData() {
    this.apiService
      .getTypeRequest(`specific_table_data/RESULT_REPORT_INFO/${this.commonForm.controls.report_id.value}`)
      .toPromise()
      .then((result: any) => {
        console.log(result.data);
      });
  }

  enableEditting() {
    this.editMarks = true;
  }

  updateSingleMarks(product){
    if (product.max_marks == 0 || product.max_marks > 0) {
      this.dataFetch = true;
    var data = {
      report_id:this.commonForm.controls.report_id.value,
      subject_allocation_ids:[],
      marks_array:[],
      marks_allocation_id:product.subject_allocation_id,
      marks:product.max_marks
    }
    this.apiService.postTypeRequest("marks_allocation_ops/update",data)
      .toPromise()
        .then((result: any) => {
          if(result.result){
            this.toster.success(result.message)
            this.updateSubjectMarksID = -1
            this.getSubjects()
          } else{
            this.toster.error(result.message)
            this.dataFetch = false;
          }
        })
    } else{
      this.toster.error("please enter proper marks")
    }
  }

  updateMarks() {
    var max_marks = [];
    var subject_allocation_ids = [];
    try {
      for (const iterator of this.assignedSubjectList) {
        if (iterator.max_marks == 0 || iterator.max_marks > 0) {
          max_marks.push(Number(iterator.max_marks));
          subject_allocation_ids.push(iterator.subject_allocation_id);
        } else if (iterator.max_marks < 0) {
          throw new Error("Negative marks cannot be assigned");
        } else {
          throw new Error("Please enter all records");
        }
      }
      this.dataFetch = true;
      /* {   
        "report_id":1,
        "subject_allocation_ids":[2,14,17],
        "marks_array":[80,90,100],
        "marks_allocation_id":3, // only to update & delete
        "marks":3 // only to update
      } */
      var data = {
        report_id:this.commonForm.controls.report_id.value,
        subject_allocation_ids:subject_allocation_ids,
        marks_array:max_marks,
        marks_allocation_id:"",
        marks:""
      }
      this.apiService.postTypeRequest("marks_allocation_ops/insert",data)
      .toPromise()
        .then((result: any) => {
          if(result.result){
            this.toster.success(result.message)
            this.getSubjects()
          } else{
            this.toster.error(result.message)
            this.dataFetch = false;
          }
        })
    } catch (error) {
      this.toster.error(error);
    }
  }
}
