import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "primeng/dynamicdialog";
import { forkJoin } from "rxjs";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import * as FileSaver from "file-saver";
import { MarksReportComponent } from "./marks-report/marks-report.component";
import { EditAssignedMarksComponent } from "./edit-assigned-marks/edit-assigned-marks.component";

@Component({
  selector: "app-assigned-marks",
  templateUrl: "./assigned-marks.component.html",
  styleUrls: ["./assigned-marks.component.scss"],
})
export class AssignedMarksComponent implements OnInit {
  academic_attributes_tree: any
  dataFetch: boolean = false
  editStudents: boolean = false
  navigation = "visited"
  reportList: any[] = []
  academinYearList: any[] = []
  departmentList: any[] = []
  classList: any[] = []
  divisionList: any[] = []
  subjectList: any[] = []
  studentList: any[] = []
  mappedSubjects: any[] = []
  loading: boolean = false
  studentListLoading: boolean = false
  commonForm: FormGroup = new FormGroup({
    report_id: new FormControl("", [Validators.required]),
    academic_id: new FormControl("", [Validators.required]),
    report_result_group_name: new FormControl("", [Validators.required]),
    academic_name: new FormControl({ value: "", disabled: true }, [Validators.required]),
    department_id: new FormControl("", [Validators.required]),
    department_name: new FormControl({ value: "", disabled: true }, [Validators.required]),
    class_id: new FormControl("", [Validators.required]),
    class_name: new FormControl({ value: "", disabled: true }, [Validators.required]),
    division_id: new FormControl("", [Validators.required]),
    division_name: new FormControl({ value: "", disabled: true }, [Validators.required]),
    student_ids: new FormControl([]),
    marks: new FormControl([]),
    marks_ids: new FormControl([]),
    subject_allocation_id: new FormControl(),
  })
  constructor(public apiService: ApiService, public spinner: SpinnerService, public toster: ToastrService, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.loadData(),
    forkJoin([
      this.apiService
        .getTypeRequest("academic_attributes_tree")
        .toPromise()
        .then((result: any) => {
          this.academic_attributes_tree = result?.data,
          this.academic_attributes_tree.forEach((academinYear) => {
            if (academinYear.department_data.length > 0) {
              var academicData = {
                academic_year_id: academinYear.academic_year_id,
                academic_year_name: academinYear.academic_year_name,
              }
              this.academinYearList.push(academicData)
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
                  }
                  this.mappedSubjects.push(data);
                });
              });
            });
          });
        })
    ]);
  }

  getDepartments() {
    for (const academic_year of this.academic_attributes_tree) {
      if (academic_year.academic_year_id == this.commonForm.controls.academic_id.value) {
        this.departmentList = [],
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
        this.classList = [],
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
        this.divisionList = [],
        clas.division_data.forEach((division) => {
          this.divisionList.push(division);
        });
        break;
      }
    }
  }

  getSubjects() {
    if (this.commonForm.valid) {
      this.dataFetch = true,
      this.apiService
        .postTypeRequest("subject_allocation_data", this.commonForm.getRawValue())
        .toPromise()
        .then((result: any) => {
          if (result.result) {
            this.subjectList = result.data
          }
        })
        .finally(() => {
          this.dataFetch = false
        })
    } else {
      this.commonForm.markAllAsTouched()
    }
  }

  loadData() {
    this.loading = true,
    this.apiService.getTypeRequest("new_table_data/RESULT_REPORT").subscribe((result: any) => {
      this.reportList = result.data,
      this.loading = false
    })
  }


  configReport(product) {
    // console.log(product);
    
    this.commonForm.patchValue({
      report_id: product.report_id ?? "",
      academic_id: product.academic_id ?? "",
      academic_name: product.academic_name ?? "",
      report_result_group_name: product.report_result_group_name ?? "",
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
    }),
    /* console.log(this.commonForm.value),
    this.getDepartments(),
    this.getClasses(),
    this.getDivisions(),
    console.log("Division List",this.divisionList),
     */
    this.getSubjects()
  }

  async fetchStudents(product) {
    this.studentListLoading = true,
    this.commonForm.controls.subject_allocation_id.setValue(product.subject_allocation_id)
    await this.apiService.postTypeRequest(`student_data/BY_SUBJECT_ALLOCATION`, this.commonForm.getRawValue()).subscribe((result: any) => {
      this.studentList = []
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
          }
          this.studentList.push(StudentData)
        })
      }
      this.studentListLoading = false
    })
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.studentList)
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] }
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      })
      this.saveAsExcelFile(excelBuffer, "TransactionsList")
    })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,charset=UTF-8"
    let EXCEL_EXTENSION = ".xlsx"
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    })
    FileSaver.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION)
  }

  exportPdf() {
    const ref = this.dialogService.open(MarksReportComponent, {
      data: {
        studentList: this.studentList,
        commonForm: this.commonForm.getRawValue(),
      },
      header: `Result Report`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-8",
    })
  }

 /*  exportTempPdf() {
    const ref = this.dialogService.open(MarksReportComponent, {
      data: {
        "studentList": [
            {
                "student_id": 47,
                "admission_no": "114/2016-17",
                "f_name": "MURALIDHAR",
                "m_name": "HANAMANT",
                "l_name": "KAMBAR",
                "max_marks": "87",
                "grade": "A"
            },
            {
                "student_id": 48,
                "admission_no": "112/2016-17",
                "f_name": "KARTIK ",
                "m_name": "VEERANNA",
                "l_name": "BADIGER",
                "max_marks": "90",
                "grade": "A"
            },
            {
                "student_id": 49,
                "admission_no": "116/2016-17",
                "f_name": "SUPREETA",
                "m_name": "ARJUN",
                "l_name": "MULLUR",
                "max_marks": "90",
                "grade": "A"
            },
            {
                "student_id": 50,
                "admission_no": "117/2016-17",
                "f_name": "Anupama",
                "m_name": "Raghavendra",
                "l_name": "Patil",
                "max_marks": "80",
                "grade": "B+"
            },
            {
                "student_id": 52,
                "admission_no": "120/2016-17",
                "f_name": "CHIRAG",
                "m_name": "UMESH",
                "l_name": "DARMASHI",
                "max_marks": "90",
                "grade": "A"
            },
            {
                "student_id": 53,
                "admission_no": "126/2016-17",
                "f_name": "Deepak",
                "m_name": "Shivanagoud",
                "l_name": "Patil",
                "max_marks": "90",
                "grade": "A"
            },
            {
                "student_id": 55,
                "admission_no": "136/2016-17",
                "f_name": "Aishwarya",
                "m_name": "Ravi",
                "l_name": "Kabbur",
                "max_marks": "87",
                "grade": "A"
            },
            {
                "student_id": 176,
                "admission_no": "105/2018-19",
                "f_name": "Shreyas",
                "m_name": "Mallappa",
                "l_name": "Kambar",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 188,
                "admission_no": "153/2018-19",
                "f_name": "VEDHA ",
                "m_name": "SURESH",
                "l_name": "AMALAZARI",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 257,
                "admission_no": "34/2020-21",
                "f_name": "Kavya",
                "m_name": "Shankrappa",
                "l_name": "Udapudi",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 274,
                "admission_no": "107/2019-20",
                "f_name": "Vinita ",
                "m_name": "Krishna",
                "l_name": "Hugar",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 298,
                "admission_no": "30/2020-21",
                "f_name": "Varsha ",
                "m_name": "Ishwar",
                "l_name": "Chavan",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 301,
                "admission_no": "36/2020-21",
                "f_name": "Shrinivas ",
                "m_name": "Hanamanth",
                "l_name": "Kambar",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 304,
                "admission_no": "40/2020-21",
                "f_name": "Priyank",
                "m_name": "Prakash",
                "l_name": "Ganiger",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 305,
                "admission_no": "41/2020-21",
                "f_name": "Vittal",
                "m_name": "Kariyappa",
                "l_name": "Baragi",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 315,
                "admission_no": "52/2020-21",
                "f_name": "Sairaj",
                "m_name": "Manjunath",
                "l_name": "Mudakavi",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 316,
                "admission_no": "54/2020-21",
                "f_name": "Krishna ",
                "m_name": "Anil",
                "l_name": "Yadahalli",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 366,
                "admission_no": "62-2021-22",
                "f_name": "Prince ",
                "m_name": "Shankarsingh",
                "l_name": "Rajput",
                "max_marks": null,
                "grade": null
            },
            {
                "student_id": 367,
                "admission_no": "63/2021-22",
                "f_name": "Uday",
                "m_name": "Rajesh",
                "l_name": "Rajput",
                "max_marks": null,
                "grade": null
            }
        ],
        "commonForm": {
            "report_id": 8,
            "academic_id": 1,
            "report_result_group_name": "Unit Test 1",
            "academic_name": "2022-23",
            "department_id": 1,
            "department_name": "ENGLISH",
            "class_id": 6,
            "class_name": "8th",
            "division_id": 1,
            "division_name": "A",
            "student_ids": [],
            "marks": [],
            "marks_ids": [],
            "subject_allocation_id": 53
        }
    },
      header: `Configure Report`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-8",
    })
  } */

  submitMarks() {}

  editAssignedMarks() {
    const ref = this.dialogService.open(EditAssignedMarksComponent, {
      data: {
        studentList: this.studentList,
        commonForm: this.commonForm.getRawValue(),
      },
      header: `Edit Marks`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-8",
    })
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.fetchStudents(this.commonForm.getRawValue());
        // this.configReport(result.data[0])
      }
    });
  }
}
