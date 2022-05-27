import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { StudentService } from "src/app/shared/services/student_services/student.service";
import { FeeService } from "../Service/fee.service";

@Component({
  selector: "app-due-fees",
  templateUrl: "./due-fees.component.html",
  styleUrls: ["./due-fees.component.scss"],
})
export class DueFeesComponent implements OnInit {
  public isFilter: boolean = true;
  filterForm: FormGroup = new FormGroup({
    academicYear: new FormControl(""),
    department: new FormControl(""),
    class: new FormControl(""),
    studentName: new FormControl(""),
  });
  List: any = [];
  departmentList: any = [];
  classList: any = [];
  StudentList: any = [];
  Students: any = [];
  dataFetch: boolean = false;
  constructor(
    public studentService: StudentService, 
    public apiService: ApiService, 
    public feeService: FeeService, 
    public router: Router, 
    public toster: ToastrService
    ) {}


  ngOnInit(): void {
    this.dataFetch = true
    this.apiService.getTypeRequest("dropdown_data/DEPARTMENT").subscribe((result: any) => {
      if (result.result) {
        this.departmentList = result.data;
      } else {
        this.toster.error(result.message);
      }
    });
    this.apiService.getTypeRequest("dropdown_data/CLASS").subscribe((result: any) => {
      if (result.result) {
        this.classList = result.data;
      } else {
        this.toster.error(result.message);
      }
    });
    this.apiService.getTypeRequest("get_due_fees").subscribe((result: any) => {
      if (result.result) {
        this.dataFetch = false;
        this.StudentList = result.data;
        this.Students = result.data;
      }
    });
  }

  openSelectd(data) {
    this.studentService.setSelectedStudent(data);
    this.studentService.setSelectedTab("Fees");
    this.router.navigate(["/student/studentInfo"]);
  }

  onFilterData(value) {
    this.StudentList = [];
    this.Students.filter((x) => {
      if (
        (this.filterForm.get("academicYear").value ? x.academic_year.includes(this.filterForm.get("academicYear").value) : true) &&
        (this.filterForm.get("department").value ? x.department.includes(this.filterForm.get("department").value) : true) &&
        (this.filterForm.get("class").value ? x.class.includes(this.filterForm.get("class").value) : true) &&
        (x.student_name.toLowerCase().includes(value.toLowerCase()) || x.admission_no.toString().includes(value))
      ) {
        this.StudentList.push(x);
      }
    });
  }

  reset() {
    this.filterForm.reset({
      academicYear: "",
      department: "",
      class: "",
      studentName: "",
    });
  }
}
