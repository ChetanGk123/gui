import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { StudentService } from 'src/app/shared/services/student_services/student.service';
import { FeeService } from '../../fees/Service/fee.service';
import { AcademicYearComponent } from '../../misc/academic-year/academic-year.component';
import { ClassComponent } from '../../misc/class/class.component';
import { DepartmentComponent } from '../../misc/department/department.component';
import { DivisionComponent } from '../../misc/division/division.component';

@Component({
  selector: 'app-promote-students',
  templateUrl: './promote-students.component.html',
  styleUrls: ['./promote-students.component.scss'],
})
export class PromoteStudentsComponent implements OnInit {

  public isFilter: boolean = true;
  public asignDisable: boolean = false;
  filterForm: FormGroup = new FormGroup({
    academicYear: new FormControl(""),
    department: new FormControl(""),
    class: new FormControl(""),
    studentName: new FormControl(""),
  });
  List: any = [];
  academinYearList: any = [];
  departmentList: any = [];
  classList: any = [];
  divisionList: any = [];
  StudentList: any = [];
  selectedStudents: any = [];
  Students: any = [];
  dataFetch: boolean = false;

  promotionForm: FormGroup = new FormGroup({
    student_ids: new FormControl([], [Validators.required]),
    academic_year_id: new FormControl("", [Validators.required]),
    dept_id: new FormControl("", [Validators.required]),
    class_id: new FormControl("", [Validators.required]),
    division_id: new FormControl("", [Validators.required]),
    user_comments: new FormControl(""),
  })
  constructor(
    public studentService: StudentService, 
    public apiService: ApiService, 
    public feeService: FeeService, 
    public router: Router, 
    public toster: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataFetch = true
    this.asignDisable = false
    this.apiService.getTypeRequest("dropdown_data/ACADEMIC_YEAR").subscribe((result: any) => {
      if (result.result) {
        this.academinYearList = result.data;
      } else {
        this.toster.error(result.message);
      }
    });
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
    this.apiService.getTypeRequest("dropdown_data/DIVISION").subscribe((result: any) => {
      if (result.result) {
        this.divisionList = result.data;
      } else {
        this.toster.error(result.message);
      }
    });
    this.apiService.getTypeRequest("get_non_promoted_students/null").subscribe((result: any) => {
      if (result.result) {
        this.StudentList = result.data;
        
        this.Students = result.data;
      }
      this.dataFetch = false;
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

  reset() {
    this.filterForm.reset({
      academicYear: "",
      department: "",
      class: "",
      studentName: "",
    });
  }

  AddStudents(){
    let Students = [];
    this.selectedStudents.forEach(element => {
      Students.push(element.student_id)
    });
    this.promotionForm.get('student_ids').setValue(Students)
    
  }

  promoteStudents(){
    this.asignDisable = true;
    this.apiService.postTypeRequest('promote_students',this.promotionForm.value).subscribe((result:any)=>{
      if(result.result){
        this.ngOnInit();
        this.toster.success(result.message)
      }else{
        this.toster.error(result.message)
        this.asignDisable = false
      }
      
    })
  }

  addAcademicYear(){
    const dialogRef = this.dialog.open(AcademicYearComponent,{width:"50%"})
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest('dropdown_data/ACADEMIC_YEAR').subscribe((result:any) => {
          this.academinYearList = result.data
        })
      }
    });
  }
  addDepartment(){
    const dialogRef = this.dialog.open(DepartmentComponent,{width:"50%"})
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest('dropdown_data/DEPARTMENT').subscribe((result:any) => {
          this.departmentList = result.data
        })
      }
    });
  }
  addClass(){
    const dialogRef = this.dialog.open(ClassComponent,{width:"50%"})
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest('dropdown_data/CLASS').subscribe((result:any) => {
          this.classList = result.data
        })
      }
    });
  }
  addDivision(){
    const dialogRef = this.dialog.open(DivisionComponent,{width:"50%"})
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest('dropdown_data/DIVISION').subscribe((result:any) => {
          this.divisionList = result.data
        })
      }
    });
  }
}
