import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode, SortType, DatatableComponent } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { StudentService } from "src/app/shared/services/student_services/student.service";
import { ExcelService } from "src/app/shared/services/excel.service";

export interface profileDetails {
  academic_year: string;
  admission_date: string;
  admission_no: string;
  class: string;
  department: string;
  dept_code: string;
  division: string;
  link: string;
  mobile: string;
  student_id: number;
  student_name: string;
  student_photo: string;
}
export interface profileListDetails {
  academicYear: string;
  admissionDate: string;
  admissionNo: string;
  class: string;
  department: string;
  deptCode: string;
  division: string;
  link: string;
  mobile: string;
  studentId: number;
  studentName: string;
  studentPhoto: string;
}

@Component({
  selector: "app-all-students",
  templateUrl: "./all-students.component.html",
  styleUrls: ["./all-students.component.scss"],
  providers: [NgbPaginationConfig],
})
export class AllStudentsComponent implements OnInit {
  public isFilter: boolean = true;
  layout = "grid";
  image: "assets/images/user/1.jpg";
  profileList: profileListDetails;
  StudentList: any = [];
  Students: any = [];
  temp = [];
  depFilterList = [];
  classFilterList = [];
  dataFetch: boolean = false;
  departmentList = [];
  academicYearList = [];
  classList = [];
  genderList = [];
  page = 1;
  pageSize = 12;
  filterForm: FormGroup;
  columns = [{ name: "Student_photo" }, { name: "Student_name" }, { name: "AdmissionNo" }, { name: "Department" }, { name: "Class" }];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  SortType = SortType;

  constructor(
    private fb: FormBuilder,
    public studentService: StudentService,
    public exportexcel: ExcelService,
    public router: Router,
    public apiService: ApiService,
    public authService: AuthService,
    public toast: ToastrService
  ) {
    this.fetchApiData();
  }

  fetchApiData() {
    this.dataFetch = true;
    this.apiService.getTypeRequest("dropdown_data/GENDER").subscribe((result: any) => {
      this.genderList = result.data;
    });
    this.apiService.getTypeRequest("dropdown_data/ACADEMIC_YEAR").subscribe((result: any) => {
      this.academicYearList = result.data;
    });
    this.apiService.getTypeRequest("dropdown_data/DEPARTMENT").subscribe((result: any) => {
      this.departmentList = result.data;
    });
    this.apiService.getTypeRequest("dropdown_data/CLASS").subscribe((result: any) => {
      this.classList = result.data;
    });
    this.apiService.getTypeRequest("table_data/ALL_ACTIVE_STUDENTS").subscribe((result: any) => {
      if (result.result) {
        this.dataFetch = false;
        this.Students = result.data;
        this.StudentList = this.Students;
      }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (x) {
      if (x.studentName.toLowerCase().includes(val) || x.admissionNo.toString().includes(val)) return x;
    });

    // update the rows
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      academicYear: [""],
      department: [""],
      class: [""],
      studentName: [""],
    });
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

  studentDetails(student) {
    this.studentService.setSelectedStudent(student);
    this.studentService.setSelectedTab("Profile");
    this.router.navigate(["/student/studentInfo"]);
  }

  changeDepFilter(name, value) {
    if (value) {
      this.depFilterList.push(name.toString());
    } else {
      var index = this.depFilterList.findIndex((x) => x == name.toString());
      this.depFilterList.splice(index, 1);
    }
    this.onFilterData("");
  }

  changeClassFilter(name, value) {
    if (value) {
      this.classFilterList.push(name.toString());
    } else {
      var index = this.classFilterList.findIndex((x) => x == name.toString());
      this.classFilterList.splice(index, 1);
    }
    this.onFilterData("");
  }

  logData(event) {
    if (event.type == "click") {
      this.studentDetails(event.row);
    }
  }

  reset() {
    this.filterForm.reset({
      academicYear: "",
      department: "",
      class: "",
      studentName: "",
    });
  }
  exportCsv() {
    this.exportexcel.exportAsExcelFile(this.StudentList, "Students List");
  }
  exportToPdf(tableId: string, name?: string) {
    let printContents, popupWin;
    printContents = document.getElementById(tableId).innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
      <title>Print tab</title>
    </head>
    <body onload="window.print();window.close()"><table class="table table-bordered">${printContents}</table></body>
  </html>`);
    popupWin.document.close();
  }
}
