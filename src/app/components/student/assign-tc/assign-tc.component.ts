import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { StudentService } from "src/app/shared/services/student_services/student.service";
import { FeeService } from "../../fees/Service/fee.service";
import { TCComponent } from "../tc/tc.component";

@Component({
  selector: "app-assign-tc",
  templateUrl: "./assign-tc.component.html",
  styleUrls: ["./assign-tc.component.scss"],
})
export class AssignTcComponent implements OnInit {
  public isFilter: boolean = true;
  // public submitLoader: boolean = false;
  filterForm: FormGroup = new FormGroup({
    academicYear: new FormControl(""),
    department: new FormControl(""),
    class: new FormControl(""),
    division: new FormControl(""),
    studentName: new FormControl(""),
  });

  // tcForm: FormGroup = new FormGroup({
  //   name: new FormControl("",[Validators.required]),
  //   student_id: new FormControl("",[Validators.required]),
  //   application_date: new FormControl((new Date()).toISOString().substring(0,10),[Validators.required]),
  //   issued_date: new FormControl((new Date()).toISOString().substring(0,10),[Validators.required]),
  //   character_of_conduct: new FormControl("",[Validators.required]),
  //   no_of_days: new FormControl("",[Validators.required]),
  //   no_of_attended_days: new FormControl("",[Validators.required]),
  //   tc_reason: new FormControl("",[Validators.required]),
  // })
  List: any = [];
  departmentList: any = [];
  classList: any = [];
  divisionList: any = [];
  StudentList: any = [];
  selectedStudents: any = [];
  Students: any = [];
  dataFetch: boolean = false;
  selectedStudent: any = "";
  constructor(public studentService: StudentService, public apiService: ApiService, public feeService: FeeService, public router: Router, public toster: ToastrService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataFetch = true;
    // this.submitLoader = false
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
    this.apiService.getTypeRequest("dropdown_data/DIVISION").subscribe((result: any) => {
      if (result.result) {
        this.divisionList = result.data;
      } else {
      }
    });
    this.apiService.getTypeRequest("table_data/ALL_ACTIVE_STUDENTS").subscribe((result: any) => {
      if (result.result) {
        this.StudentList = result.data;
        this.dataFetch = false;
        this.Students = result.data;
      }
    });
  }

  onFilterData(value) {
    this.StudentList = [];
    this.Students.filter((x) => {
      if (
        (this.filterForm.get("academicYear").value ? x.academic_year.includes(this.filterForm.get("academicYear").value) : true) &&
        (this.filterForm.get("department").value ? x.department.includes(this.filterForm.get("department").value) : true) &&
        (this.filterForm.get("class").value ? x.class.includes(this.filterForm.get("class").value) : true) &&
        (this.filterForm.get("division").value ? x.division.includes(this.filterForm.get("division").value) : true) &&
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
      division: "",
      class: "",
      studentName: "",
    });
  }

  selectStudent(data) {
    const studentData = {
      student_name: data.student_name,
      student_id: data.student_id,
    };
    this.selectedStudent = studentData;
  }

  // AssignTC(){
  //   this.submitLoader = true
  //   this.apiService.postTypeRequest("generate_tc",this.tcForm.value).subscribe((result:any)=>{
  //     if(result.result){
  //       this.toster.success("Tc Assigned")
  //       this.ngOnInit()
  //       this.router.navigate(['/student/assignedTc']);
  //       const dialogRef = this.dialog.open(TCComponent,{
  //         data:result.data,
  //         height: "88%",
  //         width: "80%",
  //       })
  //     }else{
  //       this.submitLoader = false
  //       this.toster.error(result.message)
  //     }
  //   })
  // }
}
