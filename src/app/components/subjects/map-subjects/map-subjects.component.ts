import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService } from "primeng/api";
import { forkJoin } from "rxjs";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";

@Component({
  selector: "app-map-subjects",
  templateUrl: "./map-subjects.component.html",
  styleUrls: ["./map-subjects.component.scss"],
})
export class MapSubjectsComponent implements OnInit {

  dataFetch:boolean = false;
  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  divisionList: any[] = [];
  subjectList: any[] = [];
  teacherList: any[] = [];
  mappedSubjects: any[] = [];
  constructor(public apiService: ApiService, public spinner: SpinnerService, public toster: ToastrService) {}

  commonForm: FormGroup = new FormGroup({
    subject_allocation_id: new FormControl(""),
    academic_id: new FormControl(""),
    department_id: new FormControl(""),
    class_id: new FormControl(""),
    division_id: new FormControl(""),
    subject_id: new FormControl(""),
    teacher_id: new FormControl(""),
    max_marks: new FormControl(""),
  });
  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    forkJoin([
      (
        this.apiService
      .getTypeRequest("table_data/SUBJECT_ALLOCATION")
      .toPromise()
      .then((result: any) => {
        this.mappedSubjects = result.data;
      })
      ),
      (
        this.apiService
      .getTypeRequest("admission_form_data")
      .toPromise()
      .then((result: any) => {
        this.academinYearList = result.data["academic_year"];
        this.departmentList = result.data["department"];
        this.classList = result.data["class"];
        this.divisionList = result.data["division"];
      })
      )
      ,(
        this.apiService
      .getTypeRequest("table_data/SUBJECT")
      .toPromise()
      .then((result: any) => {
        this.subjectList = result.data;
      })
      )
      ,(
        this.apiService
      .getTypeRequest("new_table_data/ALL_EMPLOYEES")
      .toPromise()
      .then((result: any) => {
        this.teacherList = result.data;
      })
      )
    ]);
  }
}
