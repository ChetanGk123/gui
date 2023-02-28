import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-map-report",
  templateUrl: "./map-report.component.html",
  styleUrls: ["./map-report.component.scss"],
})
export class MapReportComponent implements OnInit {
  navigation = "visited";
  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  divisionList: any[] = [];
  resultGroupList: any[] = [];
  criteriaGroupList: any[] = [];
  selectedList: any[] = [];
  data: any;
  commonForm: FormGroup = new FormGroup({
    report_id: new FormControl(""),
    result_report_group_id: new FormControl("", [Validators.required]),
    result_date: new FormControl("", [Validators.required]),
    exam_date: new FormControl("", [Validators.required]),
    /* academic_id: new FormControl("",[Validators.required]),
    department_id: new FormControl("",[Validators.required]),
    class_id: new FormControl("",[Validators.required]),
    division_id: new FormControl("",[Validators.required]), */
    result_criteria_group_id: new FormControl("", [Validators.required]),
  });
  constructor(public datepipe: DatePipe, public config: DynamicDialogConfig, public apiService: ApiService, public toster: ToastrService, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.apiService.getTypeRequest("new_table_data/RESULT_REPORT_GROUP").subscribe((result: any) => {
      this.resultGroupList = result.data;
    });
    this.apiService.getTypeRequest("new_table_data/RESULT_CRITERIA_GROUP").subscribe((result: any) => {
      this.criteriaGroupList = result.data;
    });
    this.getAcademicYears();
    if (this.config.data.operation != "insert") {
      var data = this.config.data.data;
      console.log(this.config.data);
      var dob = this.config?.data?.data.result_date.split("-");
      this.commonForm.patchValue({
        report_id: data.report_id,
        report_name: data.name,
        result_date: this.datepipe.transform(new Date(Number(dob[2]) + "/" + Number(dob[1]) + "/" + Number(dob[0])), "yyyy-MM-dd"),
        academic_id: data.academic_id,
        department_id: data.department_id,
        class_id: data.class_id,
        division_id: data?.division_id ?? data.div_id,
      });
      /* this.getDepartments();
      this.getClasses(); */
      if (this.config.data.operation == "delete") {
        const controls = this.commonForm.controls;
        for (const control in controls) {
          controls[control].disable();
        }
      }
    }
  }

  getAcademicYears() {
    this.data = this.config.data.academic_attributes_tree;
    this.academinYearList = [];
    this.config.data.academic_attributes_tree.forEach((element) => {
      if (element.department_data.length > 0) {
        // this.academinYearList.push(element);
        var data = {
          label: element.academic_year_name,
          data: element.academic_year_id,
          expandedIcon: "pi pi-folder-open",
          collapsedIcon: "pi pi-folder",
          children: this.getDepartments(element),
        };
        this.academinYearList.push(data);
      }
    });
    console.log(this.academinYearList);
  }

  getDepartments(academicYear: any) {
    this.departmentList = [];
    academicYear.department_data.forEach((department) => {
      if (department.class_data.length > 0)
        var data = {
          label: department.department_name,
          data: department.department_id,
          expandedIcon: "pi pi-folder-open",
          collapsedIcon: "pi pi-folder",
          children: this.getClasses(department),
        };
      this.departmentList.push(data);
    });
    return this.departmentList;
  }

  getClasses(department: any) {
    this.classList = [];
    department.class_data.forEach((class_data) => {
      if (class_data.division_data.length > 0) {
        var data = {
          label: class_data.class_name,
          data: class_data.class_id,
          expandedIcon: "pi pi-folder-open",
          collapsedIcon: "pi pi-folder",
          children: this.getDivisions(class_data),
        };
        this.classList.push(data);
      }
    });
    return this.classList;
  }

  getDivisions(class_data: any) {
    console.log(class_data);
    this.divisionList = [];
    class_data.division_data.forEach((division) => {
      var data = {
        label: division.division_name,
        data: division.division_id,
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder",
      };
      this.divisionList.push(data);
    });
    return this.divisionList;
  }
  /* getDepartments() {
    for (const academic_year of this.data) {
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
  } */

  submit() {
    console.log(this.commonForm.value);
    /* this.apiService.postTypeRequest(`result_report_master_ops/${this.config.data.operation}`, this.commonForm.value).subscribe((result: any) => {
        if (result.result) {
          this.toster.success(result.message);
          this.ref.close(true);
        } else {
          this.toster.error(result.message);
          this.ref.close(false);
        }
      }); */
    console.log(this.selectedList);
  }

  cancel() {
    this.ref.close(false);
  }
}
