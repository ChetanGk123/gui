import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { StudentService } from "src/app/shared/services/student_services/student.service";
import { ToastrService } from "ngx-toastr";
import {
  academic_info,
  AdmissionForm,
  parent_info,
  schoolHistory,
  student_info,
} from "src/app/shared/model/admissionForm";
import {
  admission_data,
  current_academic_details,
  parent_data,
  personal_data,
  previous_academic_data,
  student_documents,
} from "src/app/shared/model/Profile";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { AdmissionLetterComponent } from "../admission-letter/admission-letter.component";
import { AddNewComponent } from "../add-new/add-new.component";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { WebcamImage } from "ngx-webcam";

declare var require;
const Swal = require("sweetalert2");
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  @ViewChild("pdfViewerOnDemand") pdfViewerOnDemand;

  webcamImage: WebcamImage | undefined;
  student: any = this.studentService.getSelectedStudent;
  selectedTab: any = this.studentService.getSelectedTab;
  editValue: any = "";
  form: FormGroup = new FormGroup({
    file: new FormControl(),
  });
  dataFetch: boolean = false;
  cameraDialog: boolean = false;
  ProfilePhotoloader: boolean = false;
  admission_data: admission_data;
  current_academic_details: current_academic_details;
  personal_data: personal_data;
  parent_data: parent_data;
  previous_academic_data: any;
  student_documents = [];
  DocumentList = [];
  fileGroup: FormGroup;

  profilePhoto?: File;
  url: string | ArrayBuffer = "assets/images/user.png";
  file_data: FormData;
  constructor(
    public studentService: StudentService,
    private fb: FormBuilder,
    public toster: ToastrService,
    public apiService: ApiService,
    public authService: AuthService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public router: Router,
    public http: HttpClient
  ) {}
 
  getDataFromDataUrl(dataUrl: string, mimeType: string) {
    return dataUrl.replace(`data:${mimeType};base64,`, "");
  }
  handleImage(file: any) {
    this.cameraDialog = false
    this.form.get("file").setValue(file);
    this.uploadProfilePhoto()
  }

  async fetchApi() {
    this.dataFetch = false;
    var admissionId = this.student?.student_id ?? this.student?.student_id;
    if (admissionId) {
      await this.apiService
        .getTypeRequest("student_profile/" + admissionId)
        .subscribe((result: any) => {
          if (result.result) {
            this.dataFetch = true;
            this.admission_data =
              result.data["student_admission_data_by_student_id"];
            this.studentService.admission_data = this.admission_data;
            this.current_academic_details =
              result.data["current_academic_details_by_student_id"];
            this.studentService.current_academic_details =
              this.current_academic_details;
            this.personal_data =
              result.data["student_personal_data_by_student_id"];
            this.studentService.personal_data = this.personal_data;
            this.parent_data = result.data["student_parent_data_by_student_id"];
            this.studentService.parent_data = this.parent_data;
            this.previous_academic_data = result.data["previous_academic_data"];
            this.studentService.previous_academic_data =
              this.previous_academic_data;
            this.student_documents =
              result.data["student_documents_by_student_id"];
            this.studentService.student_documents = this.student_documents;
          } else {
            if (result.error_code === "INVALID_LOGIN") {
              this.toster.error("Session Expired");
              this.authService.SignOut();
            }
          }
        });
    } else {
      this.router.navigate(["/student/allStudents"]);
    }
  }

  ngOnInit() {
    this.fetchApi();
    this.ProfilePhotoloader = false
  }

  readProfilePhoto(event: any) {
    this.profilePhoto = event.target.files[0];
    console.log(this.profilePhoto);

    this.form.get("file").setValue(this.profilePhoto);
  }

  async uploadProfilePhoto() {
    this.ProfilePhotoloader = true
    const formData: FormData = new FormData();
    formData.append("file", this.form.get("file").value);
    formData.append("token", this.apiService.getTocken);
    this.file_data = formData;
    var loc;
    await this.apiService
      .postFileTypeRequest("upload_student_document", formData)
      .toPromise()
      .then((result: any) => {
        if(result.result){
          loc = result.data.file_loc
          var file = {
            student_id: this.admission_data.student_id,
            img_loc: loc,
          };
          this.apiService
            .postTypeRequest("save_student_photo", file)
            .subscribe(async (result: any) => {
              if (result.result) {
                this.toster.success("Data added successfully");
                this.fetchApi();
                this.ProfilePhotoloader = false
              } else {
                this.toster.error(result.message);
              }
            });
        }else{
          this.ProfilePhotoloader = false
          this.toster.error(result.message);
        }
      });
  }

  comparer(otherArray) {
    return function (current) {
      return (
        otherArray.filter(function (other) {
          return other.id == current.id;
        }).length == 0
      );
    };
  }

  openAdmissionForm() {
    const dialogRef = this.dialog.open(AdmissionLetterComponent, {
      data: {
        admission_data: this.admission_data,
        current_academic_details: this.current_academic_details,
        personal_data: this.personal_data,
        parent_data: this.parent_data,
        previous_academic_data: this.previous_academic_data,
        student_documents: this.student_documents,
      },
      height: "90%",
      width: "70%",
    });
  }

  updateStudentData() {
    const dialogRef = this.dialog.open(AddNewComponent, {
      data: {
        item_id: this.admission_data.student_id,
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
  
  deleteStudentData() {
    var Request_Data = {
      item_id: this.admission_data.student_id,
    };
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
          this.apiService
            .postTypeRequest("delete_item/STUDENT", Request_Data)
            .toPromise()
            .then((result: any) => {
              if (result.result) {
                this.toster.warning("Data deleted");
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  result.message,
                  "success"
                );
                this.router.navigate(["/student/allStudents"]);
              } else {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  result.message,
                  "error"
                );
                this.toster.error(result.message);
              }
            });
        }
      });
  }
}
