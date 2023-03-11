import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-map-new-subject",
  templateUrl: "./map-new-subject.component.html",
  styleUrls: ["./map-new-subject.component.scss"],
})
export class MapNewSubjectComponent implements OnInit {
  public Loading: boolean = false;
  selectedSubjects = [];
  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  divisionList: any[] = [];
  assignedSubjectList;
  subjectList: any[] = [];
  teacherList: any[] = [];
  teachersToAsign: any[] = [];
  subjectsToAsign = "";
  subjectsToEdit = "";
  teacherIndex;
  subjectIndex;
  editSubjectIndex;
  operation;
  teacher_allocation_id;
  commonForm: FormGroup = new FormGroup({
    subject_allocation_id: new FormControl(""),
    academic_id: new FormControl("", [Validators.required]),
    department_id: new FormControl("", [Validators.required]),
    class_id: new FormControl("", [Validators.required]),
    division_id: new FormControl("", [Validators.required]),
    subject_ids: new FormControl([]),
    subject_id: new FormControl([]),
  });
  constructor(private confirmationService: ConfirmationService, public config: DynamicDialogConfig, public apiService: ApiService, public toster: ToastrService, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.teacherList = this.config.data.teacherList;
    this.subjectList = this.config.data.subjectList;
    // console.log(this.config.data);

    if (this.config.data.operation != "insert") {
      var data = this.config.data.updateDeleteData;

      for (const iterator of this.config.data.subjectList) {
        if (iterator.id == data.subject_id) {
          this.selectedSubjects.push(iterator);
          break;
        }
      }
      this.commonForm.patchValue({
        subject_allocation_id: data.subject_allocation_id,
        academic_id: data.academic_id,
        department_id: data.department_id,
        class_id: data.class_id,
        division_id: data.division_id,
      });
      this.getSubjects("sdhjf");
    }
  }

  checkForm(data: any) {
    if (this.commonForm.valid) {
      this.getSubjects(data);
    }
  }

  getTeacherData(product) {
    this.apiService
      .getTypeRequest(`specific_data/TEACHER_ALLOCATION/${product.subject_allocation_id}`)
      .toPromise()
      .then((result: any) => {
        // console.log(result.data);
      });
  }

  deleteSubject(data: any) {
    // console.log(data);
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.Loading = true;
        data.teachers.forEach((teacher) => {
          var teacherData = {
            teacher_allocation_id: teacher.teacher_allocation_id,
          };
          this.apiService.postTypeRequest(`teacher_allocation_ops/delete`, teacherData).subscribe((result: any) => {});
        });
        this.apiService.postTypeRequest(`subject_allocation_ops/delete`, data).subscribe((result: any) => {
          if (result.result) {
            this.toster.success(result.message);
            this.getSubjects("baa");
          } else {
            this.toster.error(result.message);
          }
        });

        this.Loading = false;
      },
    });
  }

  addNewRecord() {
    if (this.commonForm.valid) {
      this.Loading = true;
      this.commonForm.patchValue({
        subject_ids: [
          {
            subject_id: this.subjectsToAsign,
            teacher_ids: this.teachersToAsign,
          },
        ],
      });
      // console.log(this.commonForm.value);
      this.apiService.postTypeRequest(`subject_allocation_ops/insert`, this.commonForm.value).subscribe((result: any) => {
        if (result.result) {
          this.toster.success(result.message);
          this.getSubjects("baa");
        } else {
          this.toster.error(result.message);
        }
        this.subjectsToAsign = "";
      });
      this.teachersToAsign = [];
    this.subjectsToAsign = "";
      this.Loading = false;
    }
  }

  getSubjects(data: any) {
    if (this.commonForm.valid) {
      this.assignedSubjectList = [];
      this.Loading = true;
      this.apiService
        .postTypeRequest("subject_allocation_data", this.commonForm.value)
        .toPromise()
        .then((result: any) => {
          if (result.result) {
            this.assignedSubjectList = result.data;
            // console.log(this.assignedSubjectList);
          }
        })
        .finally(() => {
          this.Loading = false;
        });
    } else {
      this.commonForm.markAllAsTouched();
    }
  }

  teacherChange(subjectIndex, teacherIndex, index) {
    if (this.operation == "update") {
      var teacher = {
        teacher_allocation_id: this.teacher_allocation_id,
        teacher_id: Number(this.teachersToAsign),
        subject_allocation_id: this.assignedSubjectList[index].subject_allocation_id,
      };
      this.apiService.postTypeRequest(`teacher_allocation_ops/update`, teacher).subscribe((result: any) => {
        if (result.result) {
          this.getSubjects("");
        }
      });
    } else {
      var data = {
        subject_allocation_id: subjectIndex,
        teacher_ids: [this.teachersToAsign],
      };
      this.apiService.postTypeRequest(`teacher_allocation_ops/insert`, data).subscribe((result: any) => {
        if (result.result) {
          this.subjectIndex = -1;
          this.teacherIndex = -1;
          this.getSubjects("");
        }
      });
    }
    this.teachersToAsign = [];
    this.operation = "";
  }

  subjectChange(subject_allocation_id, index) {
    if (this.operation == "update") {
      var teacher = {
        subject_allocation_id: subject_allocation_id,
        academic_id:this.commonForm.controls.academic_id.value,
        department_id:this.commonForm.controls.department_id.value,
        class_id:this.commonForm.controls.class_id.value,
        division_id:this.commonForm.controls.division_id.value,
        subject_id: Number(this.subjectsToEdit),
        subject_ids:[]
      };
      this.apiService.postTypeRequest(`subject_allocation_ops/update`, teacher).subscribe((result: any) => {
        if (result.result) {
          this.getSubjects("");
        }
      });
    } else {
      var data = {
        subject_allocation_id: subject_allocation_id,
        teacher_ids: [this.teachersToAsign],
      };
      this.apiService.postTypeRequest(`subject_allocation_ops/insert`, data).subscribe((result: any) => {
        if (result.result) {
          this.subjectIndex = -1;
          this.teacherIndex = -1;
          this.getSubjects("");
        }
      });
    }
    this.editSubjectIndex = -1;
    this.subjectsToEdit = "";
    this.operation = "";
  }

  canceleChange(subjectIndex, teacherIndex) {
    this.Loading = true;
    if (this.assignedSubjectList[subjectIndex].teachers[teacherIndex]?.teacher_allocation_id) {
      // this.addTempTeacher(subjectIndex,teacherIndex)
      // this.canceleChange(subjectIndex,this.teacherIndex)
    } else {
      this.assignedSubjectList[subjectIndex].teachers.splice(teacherIndex, 1);
    }
    this.subjectIndex = -1;
    this.teacherIndex = -1;
    this.Loading = false;
  }

  addTempTeacher(subject: any, rowIndex: any) {
    this.Loading = true;
    this.assignedSubjectList[rowIndex].teachers.push({
      teacher_allocation_id: "",
      subject_allocation_id: subject.subject_allocation_id,
      employee_id: "",
      teacher_id: "",
      serial_no: "",
      employee_no: "",
      employee_name: "",
      photo: "",
    });
    this.Loading = false;
    this.operation = "insert";
    this.teacherIndex = this.assignedSubjectList[rowIndex].teachers.length - 1;
    this.subjectIndex = subject.subject_allocation_id;
  }

  deleteTeacher(teacher) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.apiService.postTypeRequest(`teacher_allocation_ops/delete`, teacher).subscribe((result: any) => {
          if (result.result) {
            this.getSubjects("");
          }
        });
      },
    });
  }

  submit() {
    if (this.commonForm.valid && this.selectedSubjects.length > 0) {
      var data = [];
      for (const key of this.selectedSubjects) {
        data.push(key.id);
      }
      if (this.config.data.operation == "insert") {
        this.commonForm.controls.subject_ids.setValue(data);
      } else {
        this.commonForm.controls.subject_id.setValue(this.config.data.updateDeleteData.subject_id);
        this.commonForm.controls.subject_ids.setValue([]);
      }
      // console.log(this.commonForm.value);
      this.apiService.postTypeRequest(`subject_allocation_ops/${this.config.data.operation}`, this.commonForm.value).subscribe((result: any) => {
        if (result.result) {
          this.toster.success(result.message);
          this.ref.close(true);
        } else {
          this.toster.error(result.message);
          this.ref.close(false);
        }
      });
    } else if (!this.commonForm.valid) {
      this.commonForm.markAllAsTouched();
      this.toster.error("Fill all required fields");
    } else {
      this.toster.error("Select atleast 1 subject");
    }
  }

  cancel() {
    this.ref.close(false);
  }
}
