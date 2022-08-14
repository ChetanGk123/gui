import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { StudentService } from "src/app/shared/services/student_services/student.service";
import { FeeService } from "../../fees/Service/fee.service";
import * as FileSaver from "file-saver";
import { MatDialog } from "@angular/material/dialog";
import { StudentListReportComponent } from "./student-list-report/student-list-report.component";
@Component({
  selector: "app-studentList",
  templateUrl: "./studentList.component.html",
  styleUrls: ["./studentList.component.scss"],
})
export class StudentListComponent implements OnInit {
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
  constructor(public studentService: StudentService, public apiService: ApiService, public feeService: FeeService, public router: Router, public toster: ToastrService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataFetch = true;
    this.apiService.getTypeRequest("dropdown_data/DEPARTMENT").subscribe((result: any) => {
      if (result.result) {
        this.departmentList = result.data;
      } else {
      }
    });
    this.apiService.getTypeRequest("dropdown_data/CLASS").subscribe((result: any) => {
      if (result.result) {
        this.classList = result.data;
      } else {
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

  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.StudentList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "TransactionsList");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportPdf() {
    const dialogRef = this.dialog.open(StudentListReportComponent, {
      data: {
        transactions: this.StudentList,
      },
      height: "88%",
      width: "80%",
    });
  }
}
