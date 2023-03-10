import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WizardComponent } from "angular-archwizard";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "primeng/dynamicdialog";
import { forkJoin } from "rxjs";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { ConfigReportComponent } from "../all-reports/config-report/config-report.component";

@Component({
  selector: "app-assign-marks",
  templateUrl: "./assign-marks.component.html",
  styleUrls: ["./assign-marks.component.scss"],
})
export class AssignMarksComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  navigation = "visited";
  loading: boolean = false;
  dataFetch: boolean = false;
  submitLoading: boolean = false;
  studentListLoading: boolean = false;
  reportList: any[] = [];
  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  divisionList: any[] = [];
  subjectList: any[] = [];
  studentList: any[] = [];
  mappedSubjects: any[] = [];
  academic_attributes_tree: any;
  commonForm: FormGroup = new FormGroup({
    report_id: new FormControl("", [Validators.required]),
    academic_id: new FormControl("", [Validators.required]),
    academic_name: new FormControl({value: '', disabled: true}, [Validators.required]),
    department_id: new FormControl("", [Validators.required]),
    department_name: new FormControl({value: '', disabled: true}, [Validators.required]),
    class_id: new FormControl("", [Validators.required]),
    class_name: new FormControl({value: '', disabled: true}, [Validators.required]),
    division_id: new FormControl("", [Validators.required]),
    division_name: new FormControl({value: '', disabled: true}, [Validators.required]),
    student_ids: new FormControl([]),
    marks: new FormControl([]),
    marks_ids: new FormControl([]),
    subject_allocation_id: new FormControl(),
  });
  constructor(public toster: ToastrService, public apiService: ApiService, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.loadData();
    this.academinYearList = []
    this.mappedSubjects = []
    forkJoin([
      this.apiService
        .getTypeRequest("academic_attributes_tree")
        .toPromise()
        .then((result: any) => {
          this.academic_attributes_tree = result?.data;
          this.academic_attributes_tree.forEach((academinYear) => {
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
          });
        }),
    ]);
  }

  getDepartments() {
    for (const academic_year of this.academic_attributes_tree) {
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
    this.subjectList = []
      this.dataFetch = true;
      this.apiService
        .postTypeRequest("subject_allocation_data", this.commonForm.value)
        .toPromise()
        .then((result: any) => {
          if (result.result) {
            this.subjectList = result.data;
          }
        })
        .finally(() => {
          this.dataFetch = false;
        });
  }

  configMarksReport(product: any) {
    product.report_id = this.commonForm.controls.report_id.value;
    console.log(product);

    const ref = this.dialogService.open(ConfigReportComponent, {
      dismissableMask: true,
      data: {
        data: product,
        academic_attributes_tree: this.academic_attributes_tree,
      },
      header: `Configure Report`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-6",
    });
    ref.onClose.subscribe((result: any) => {
      this.getSubjects();
    });
  }

  loadData() {
    this.loading = true;
    this.reportList = []
    this.apiService.getTypeRequest("new_table_data/RESULT_REPORT").subscribe((result: any) => {
      this.reportList = result.data;
      this.loading = false;
    });
  }

  configReport(product) {
    this.commonForm.patchValue({
      report_id: product.report_id ?? "",
      academic_id: product.academic_id ?? "",
      academic_name: product.academic_name ?? "",
      department_id: product.department_id ?? "",
      department_name: product.department_name ?? "",
      class_id: product.class_id ?? "",
      class_name: product.class_name ?? "",
      division_id: product.division_id ?? "",
      division_name: product.division_name ?? "",
      marks: [],
      marks_ids: [],
      student_ids: [],
      subject_allocation_id: null,
    });
    /* console.log(this.commonForm.value);
    this.getDepartments();
    this.getClasses();
    this.getDivisions();
    console.log("Division List",this.divisionList);
     */
    this.getSubjects();
  }

  fetchStudents(product) {
    this.studentListLoading = true;
    this.commonForm.controls.subject_allocation_id.setValue(product.subject_allocation_id);
    this.apiService.postTypeRequest(`student_data/BY_SUBJECT_ALLOCATION`, this.commonForm.value).subscribe((result: any) => {
      this.studentList = [];
      if (result.result) {
        result.data.allocation_data.forEach((student) => {
          var StudentData = {
            student_id: student.student_data.student_id,
            admission_no: student.student_data.admission_no,
            f_name: student.student_data.f_name,
            m_name: student.student_data.m_name,
            l_name: student.student_data.l_name,
            max_marks: student.subject_allocation_data.marks,
            grade: student.subject_allocation_data.grade,
          };
          this.studentList.push(StudentData);
        });
      }
      this.studentListLoading = false;
    });
  }

  submitMarks() {
    //var marks = this.studentList.filter((data:any)=>{if(data?.max_marks) return data}).map((ele:any)=> ele.max_marks)
    var marks = [];
    var student_ids = [];
    this.studentList.forEach((student: any) => {
      if (student.max_marks && student.grade == null) {
        marks.push(student.max_marks);
        student_ids.push(student.student_id);
      }
    });

    var data = {
      report_id: this.commonForm.controls.report_id.value,
      subject_allocation_id: this.commonForm.controls.subject_allocation_id.value,
      student_ids: student_ids,
      marks: marks,
      marks_ids: [],
    };
    try {
      this.submitLoading = true;
      this.apiService
        .postTypeRequest("save_student_marks/insert", data)
        .toPromise()
        .then((result: any) => {
          if (result.result) {
            this.toster.success(result.message);
            this.wizard.reset();
            //this.getSubjects()
          } else {
            this.toster.error(result.message);
            this.submitLoading = false;
          }
        });
    } catch (error) {
      this.toster.error(error);
    }
  }
}
