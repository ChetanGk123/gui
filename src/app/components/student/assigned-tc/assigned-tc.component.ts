import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { StudentService } from "src/app/shared/services/student_services/student.service";
import { AddNewComponent } from "../add-new/add-new.component";
import { AdmissionLetterComponent } from "../admission-letter/admission-letter.component";
import { TCComponent } from "../tc/tc.component";

declare var require;
const Swal = require("sweetalert2");

@Component({
  selector: "app-assigned-tc",
  templateUrl: "./assigned-tc.component.html",
  styleUrls: ["./assigned-tc.component.scss"],
})
export class AssignedTcComponent implements OnInit {
  public isFilter: boolean = true;
  public dataFetch: boolean = false;
  public submitLoader: boolean = false;
  public updateTc: boolean = false;
  selectedStudent: any = "";
  StudentList: any = [];
  Students: any = [];
  departmentList: any = [];
  classList: any = [];
  divisionList: any = [];
  filterForm: FormGroup = new FormGroup({
    academicYear: new FormControl(""),
    department: new FormControl(""),
    class: new FormControl(""),
    division: new FormControl(""),
    studentName: new FormControl(""),
  });
  admission_data: any;
  current_academic_details: any;
  personal_data: any;
  parent_data: any;
  previous_academic_data: any;
  student_documents: any;
  authService: any;
  constructor(public studentService: StudentService, public apiService: ApiService, public dialog: MatDialog, public toster: ToastrService) {}

  ngOnInit() {
    this.dataFetch = true;
    this.updateTc = false;
    this.apiService.getTypeRequest("table_data/ALL_TC_DATA").subscribe((result: any) => {
      if (result.error_code == 1) {
        this.toster.warning(result.message);
      } else {
        this.StudentList = result.data;
        this.Students = result.data;
      }
      this.dataFetch = false;
    });
  }

  onFilterData(value) {
    this.StudentList = [];
    this.Students.filter((x) => {
      if (x.student_name.toLowerCase().includes(value.toLowerCase())) {
        this.StudentList.push(x);
      }
    });
  }

  reset() {
    this.filterForm.reset({
      academicYear: "",
      department: "",
      division: "",
      class: "",
      studentName: "",
    });
  }
  selectStudent(data) {
    const dialogRef = this.dialog.open(TCComponent, {
      data: data,
      height: "88%",
      width: "80%",
    });
  }

  updateTC(data) {
    // console.log(data);
    this.selectedStudent = data;
    this.updateTc = true;
  }

  deleteTc(data: any) {
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
          this.dataFetch = true;
          this.apiService
            .getTypeRequest(`delete_tc/${data.student_id}`)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data deleted");
                swalWithBootstrapButtons.fire("Deleted!", result.message, "success");
                this.ngOnInit();
              } else {
                swalWithBootstrapButtons.fire("Cancelled", result.message, "error");

                this.dataFetch = false;
              }
            });
        } else {
          this.dataFetch = false;
        }
      });
  }

  viewData(data) {
    // console.log(data);
    const dialogRef = this.dialog.open(AddNewComponent, {
      data: {
        item_id: data.student_id,
        disabled: true,
      },
      height: "83.5%",
      width: "80%",
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
}
