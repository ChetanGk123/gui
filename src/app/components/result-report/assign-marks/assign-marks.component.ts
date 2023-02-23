import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-assign-marks",
  templateUrl: "./assign-marks.component.html",
  styleUrls: ["./assign-marks.component.scss"],
})
export class AssignMarksComponent implements OnInit {
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
    academic_id: new FormControl({ value: "", disabled: true }, [Validators.required]),
    department_id: new FormControl({ value: "", disabled: true }, [Validators.required]),
    class_id: new FormControl({ value: "", disabled: true }, [Validators.required]),
    division_id: new FormControl("", [Validators.required]),
    student_ids: new FormControl([]),
    marks: new FormControl([]),
    marks_ids: new FormControl([]),
    subject_allocation_id: new FormControl(),
  });
  constructor(public toster: ToastrService, public apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
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
    if (this.commonForm.valid) {
      this.dataFetch = true;
      this.apiService
        .postTypeRequest("subject_allocation_data", this.commonForm.getRawValue())
        .toPromise()
        .then((result: any) => {
          if (result.result) {
            this.subjectList = result.data;
          }
        })
        .finally(() => {
          this.dataFetch = false;
        });
    } else {
      this.commonForm.markAllAsTouched();
    }
  }

  loadData() {
    this.loading = true;
    this.apiService.getTypeRequest("new_table_data/RESULT_REPORT").subscribe((result: any) => {
      this.reportList = result.data;
      this.loading = false;
    });
  }

  configReport(product) {
    this.commonForm.patchValue({
      report_id: product.report_id ?? "",
      academic_id: product.academic_id ?? "",
      department_id: product.department_id ?? "",
      class_id: product.class_id ?? "",
      division_id: product.division_id ?? "",
    });
    this.getDepartments();
    this.getClasses();
    this.getDivisions();
  }

  fetchStudents(product) {
    /* {
      "subject_allocation_id": 9,
      "academic_id": 1,
      "academic_year_name": "2022-23",
      "department_id": 1,
      "department": "ENGLISH",
      "class_id": 1,
      "class_name": "UKG",
      "division_id": 1,
      "division_name": "A",
      "subject_id": 1,
      "subject_name": "English",
      "teachers": [
          {
              "teacher_allocation_id": 27,
              "subject_allocation_id": 9,
              "employee_id": 3,
              "teacher_id": 3,
              "serial_no": 2,
              "employee_no": "0002",
              "employee_name": "Sanjay G K",
              "photo": "https://thetechvaidya.com/school/uploads/general_docs/default_photo.png"
          }
      ],
      "max_marks": "100",
      "marks_allocation_id": 3
  } */
    this.studentListLoading = true;
    var data = {
      subject_allocation_id: product.subject_allocation_id,
      academic_id: product.academic_id,
      department_id: product.department_id,
      class_id: product.class_id,
      division_id: product.division_id,
    };
    this.commonForm.controls.subject_allocation_id.setValue(product.subject_allocation_id);
    console.log(this.commonForm.getRawValue());
    this.apiService.postTypeRequest(`student_data/BY_SUBJECT_ALLOCATION`, data).subscribe((result: any) => {
      console.log(result.data);
      if (result.result) {
        /* [{
          admission_date: "12-07-2021";
          admission_no: "20212902110433223";
          bg_id: null;
          caste_id: 8;
          category_id: 5;
          current_address: "D/o : Iranna Pujar\nAt : Near Mallikarjun Temple ";
          current_city: "Jalikatii";
          current_country: "India";
          current_district: "Bagalkot";
          current_pin: "587122";
          current_state: "Karnataka";
          current_taluka: "Mudhol";
          dob: "18-05-2015";
          dob_in_words: "Eighteen May Two Thousand Fifteen ";
          email: null;
          f_name: "Apoorva ";
          gender_id: 2;
          height: null;
          is_special_needs: 0;
          l_name: "Pujar";
          languages_studied: "";
          m_name: "Iranna ";
          mobile: "9972331609";
          nationality: "Indian";
          permanent_address: "D/o : Iranna Pujar\nAt : Near Mallikarjun Temple ";
          permanent_city: "Jalikatii";
          permanent_country: "India";
          permanent_district: "Bagalkot";
          permanent_pin: "587122";
          permanent_state: "Karnataka";
          permanent_taluka: "Mudhol";
          place_of_birth: "Bagalkot";
          previous_medium_of_instrutcion: "";
          religion_id: 1;
          sats_no: null;
          special_needs: "";
          student_id: 244;
          weight: null;
        }] */
        this.studentList = result.data;
      }
      this.studentListLoading = false;
    });
  }

  submit() {
    var data = {
      report_id: 1,
      subject_allocation_id: 2,
      student_ids: [2, 3, 11, 12, 6, 7, 8, 9, 10],
      marks: [95, 85, 75, 65, 55, 45, 34, 21, 15],
      marks_ids: [4, 5, 6, 7, 8, 9, 10],
    };

    try {
      this.submitLoading = true;
      this.apiService
        .postTypeRequest("save_student_marks/insert", data)
        .toPromise()
        .then((result: any) => {
          if (result.result) {
            this.toster.success(result.message);
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
