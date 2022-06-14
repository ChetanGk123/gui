import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  employee: any = this.employeeService.getSelectedEmployee;
  selectedTab: any = this.employeeService.getSelectedTab;
  webcamImage: WebcamImage | undefined;
  dataFetch: boolean = false;
  cameraDialog: boolean = false;
  ProfilePhotoloader: boolean = false;
  file_data: FormData;
  profilePhoto?: File;
  form: FormGroup = new FormGroup({
    file: new FormControl(),
  });
  constructor(
    public employeeService: EmployeeService,
    private fb: FormBuilder,
    public toster: ToastrService,
    public apiService: ApiService,
    public authService: AuthService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public router: Router,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.fetchApi()
  }

  handleImage(file: any) {
    this.cameraDialog = false
    this.form.get("file").setValue(file);
    this.uploadProfilePhoto()
  }

  fetchApi(){
     this.dataFetch = false;
    var employeeId = this.employee?.employee_id;
    console.log(employeeId);
    if(employeeId){
      this.apiService
        .getTypeRequest("employee_profile/" + employeeId)
        .subscribe((result: any) => {
          if(result.result){
            this.dataFetch = true
            this.employee = result.data.employee_info
          }else{
            this.toster.error(result.message)
          }
        })
    }else{
      this.router.navigate(["/employee/allEmployees"]);
    }
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
      .postFileTypeRequest("upload_employee_doc", formData)
      .toPromise()
      .then((result: any) => (loc = result.data.file_loc));
    if (loc) {
      var file = {
        employee_id: this.employee.employee_id,
        img_loc: loc,
      };
      await this.apiService
        .postTypeRequest("save_employee_photo", file)
        .subscribe(async (result: any) => {
          if (result.result) {
            this.toster.success("Data added successfully");
            this.ngOnInit();
          } else {
            this.toster.error(result.message);
          }
          this.ProfilePhotoloader = false
        });
    }
    else{
      this.ProfilePhotoloader = false
    }
  }

}
