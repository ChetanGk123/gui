import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { forkJoin } from "rxjs";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { MapNewSubjectComponent } from "./map-new-subject/map-new-subject.component";
import { MapTeachersComponent } from "./map-teachers/map-teachers.component";

@Component({
  selector: "app-map-subjects",
  templateUrl: "./map-subjects.component.html",
  styleUrls: ["./map-subjects.component.scss"],
})
export class MapSubjectsComponent implements OnInit {
  dataFetch: boolean = false;
  public isFilter: boolean = true;
  currentAcademicYear;
  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  divisionList: any[] = [];
  subjectList: any[] = [];
  teacherList: any[] = [];
  mappedSubjects: any[] = [];
  admission_form_data: any;
  data: any;
  constructor(private confirmationService: ConfirmationService,public apiService: ApiService, public spinner: SpinnerService, public toster: ToastrService, public dialogService: DialogService) {}

  commonForm: FormGroup = new FormGroup({
    subject_allocation_id: new FormControl(""),
    academic_id: new FormControl(""),
    department_id: new FormControl(""),
    class_id: new FormControl(""),
    division_id: new FormControl(""),
  });
  ngOnInit(): void {
    this.getAcademicYears();
    (this.dataFetch = true), this.fetchData();
  }

  fetchFilterData() {
    this.dataFetch = true;
  }

  getAcademicYears() {
    this.dataFetch = true;
    this.apiService
      .getTypeRequest("academic_attributes_tree")
      .toPromise()
      .then((result: any) => {
        this.data = result.data;
        this.mappedSubjects = [];
        this.data.forEach((academinYear) => {
          if(academinYear.department_data.length > 0)
          {
            var academicData = {
              academic_year_id:academinYear.academic_year_id,
                    academic_year_name:academinYear.academic_year_name,
            }
            this.academinYearList.push(academicData)
          }
          academinYear.department_data.forEach(department => {
            department.class_data.forEach(clas => {
              clas.division_data.forEach(division => {
                var data ={
                  academic_id:academinYear.academic_year_id,
                  academic_name:academinYear.academic_year_name,
                  department_id:department.department_id,
                  department_name:department.department_name,
                  class_id:clas.class_id,
                  class_name:clas.class_name,
                  division_id:division.division_id,
                  division_name:division.division_name,
                }
                this.mappedSubjects.push(data);
              });
            });
          });
        });
        this.dataFetch = false;
      });
  }

  getDepartments(val: any) {
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
  getClasses(val: any) {
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
  getDivisions(val: any) {
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
  getSubjects(val: any) {
    this.apiService
      .postTypeRequest("academic_attributes_data", this.commonForm.value)
      .toPromise()
      .then((result: any) => {
        // console.log(result);
        if (result.result) {
        }
      });
  }

  fetchData() {
    this.commonForm.patchValue({
      subject_allocation_id: this.commonForm.controls.subject_allocation_id.value ?? null,
      academic_id: this.commonForm.controls.academic_id.value ?? null,
      department_id: this.commonForm.controls.department_id.value ?? null,
      class_id: this.commonForm.controls.class_id.value ?? null,
      division_id: this.commonForm.controls.division_id.value ?? null,
    });

    forkJoin([
      ((this.dataFetch = true)),
      this.apiService
        .getTypeRequest("table_data/SUBJECT")
        .toPromise()
        .then((result: any) => {
          this.subjectList = result.data;
        }),
      this.apiService
        .getTypeRequest("new_table_data/ALL_EMPLOYEES")
        .toPromise()
        .then((result: any) => {
          this.teacherList = result.data;
        }),
      this.apiService
        .getTypeRequest("admission_form_data")
        .toPromise()
        .then((result: any) => {
          this.admission_form_data = result.data;
        }),
    ]);
  }

  clearData() {
    this.commonForm.reset({
      subject_allocation_id: "",
      academic_id: "",
      department_id: "",
      class_id: "",
      division_id: "",
    });
    this.fetchData();
  }

  addSubjects() {
    const ref = this.dialogService.open(MapNewSubjectComponent, {
      data: {
        operation: "insert",
        /* this.academinYearList = result.data["academic_year"];
        this.bloodGroupList = result.data["blood_group"];
        this.genderList = result.data["gender"];
        this.categoryList = result.data["category"];
        this.casteList = result.data["caste"];
        this.religionList = result.data["religion"];
        this.departmentList = result.data["department"];
        this.classList = result.data["class"];
        this.divisionList = result.data["division"]; */
        academinYearList: this.admission_form_data["academic_year"],
        departmentList: this.admission_form_data["department"],
        classList: this.admission_form_data["class"],
        divisionList: this.admission_form_data["division"],
        subjectList: this.subjectList,
        teacherList: this.teacherList
      },
      header: `Subject Class Mapping`,
      styleClass: "w-11 sm:w-10 md:w-11 lg:w-8",
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.fetchData();
      }
    });
  }

  updateSubject(data: any) {
    const ref = this.dialogService.open(MapNewSubjectComponent, {
      data: {
        operation: "update",
        updateDeleteData: data,
        academinYearList: this.admission_form_data["academic_year"],
        departmentList: this.admission_form_data["department"],
        classList: this.admission_form_data["class"],
        divisionList: this.admission_form_data["division"],
        subjectList: this.subjectList,
        teacherList: this.teacherList
      },
      header: `Update Mapped Subjects`,
      styleClass: "w-11 sm:w-10 md:w-11 lg:w-8",
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.fetchData();
      }
    });
  }
  deleteSubject(data: any) {
    // const ref = this.dialogService.open(MapNewSubjectComponent, {
    //   data: {
    //     operation: "delete",
    //     updateDeleteData: data,
    //     academinYearList: this.admission_form_data["academic_year"],
    //     departmentList: this.admission_form_data["department"],
    //     classList: this.admission_form_data["class"],
    //     divisionList: this.admission_form_data["division"],
    //     subjectList: this.subjectList,
    //     teacherList: this.teacherList
    //   },
    //   header: `Delete Mapped Subjects`,
    //   styleClass: "w-10 sm:w-10 md:w-10 lg:w-6",
    // });
    // ref.onClose.subscribe((result: any) => {
    //   if (result) {
    //     this.fetchData();
    //   }
    // });
    // console.log(data);
    
  }

  updateTeacher(data: any) {
    var selectedTeachers: any[] = [];
    this.apiService
      .getTypeRequest(`specific_data/TEACHER_ALLOCATION/${data.subject_allocation_id}`)
      .toPromise()
      .then((result: any) => {
        if (result.result) {
          for (const iterator of this.teacherList) {
            if (iterator.employee_id == result.data.teacher_id) {
              selectedTeachers.push(iterator);
              break;
            }
          }
        }
        const ref = this.dialogService.open(MapTeachersComponent, {
          data: {
            data: data,
            teacherList: this.teacherList,
            selectedTeachers: selectedTeachers,
          },
          header: `Subject Teacher Mapping`,
          styleClass: "w-10 sm:w-10 md:w-10 lg:w-6",
        });
        ref.onClose.subscribe((result: any) => {
          if (result) {
            this.fetchData();
          }
        });
      });
  }

  submit() {
    /* {   
      "subject_allocation_id":13,
      "academic_id":2,
      "department_id":1,
      "class_id":1,
      "division_id":2,
      "subject_ids":[3,3,5,6],
      "subject_id":3
    } */
  }
}
