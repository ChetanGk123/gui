import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { BloodGroupComponent } from "../../misc/blood-group/blood-group.component";
import { CasteComponent } from "../../misc/caste/caste.component";
import { CategoryComponent } from "../../misc/category/category.component";
import { GenderComponent } from "../../misc/gender/gender.component";
import { ReligionComponent } from "../../misc/religion/religion.component";
import { EmployeeService } from "../../../shared/services/employee/employee.service";
import { WizardComponent } from "angular-archwizard";

@Component({
  selector: "app-add-new",
  templateUrl: "./add-new.component.html",
  styleUrls: ["./add-new.component.scss"],
})
export class AddNewComponent implements OnInit {
  dataFetch: boolean = false;
  submitDisable: boolean = false;
  navigation = "visited";
  genderList: any = [];
  bloodGroupList: any = [];
  categoryList: any = [];
  casteList: any = [];
  religionList: any = [];

  employeeForm: FormGroup = new FormGroup({
    employee_info: new FormGroup({
      employee_id: new FormControl(""),
      institution_id: new FormControl(""),
      serial_no: new FormControl(""),
      photo: new FormControl(""),
      employee_no: new FormControl(""),
      generate_emp_no: new FormControl(true, [Validators.required]),
      joining_date: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required]),
      f_name: new FormControl("", [Validators.required]),
      m_name: new FormControl("", [Validators.required]),
      l_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("", [Validators.minLength(10), Validators.maxLength(12)]),
      dob: new FormControl("", [Validators.required]),
      current_address: new FormControl("", [Validators.required]),
      current_city: new FormControl("", [Validators.required]),
      current_pin: new FormControl("", [Validators.required]),
      current_taluka: new FormControl("", [Validators.required]),
      current_district: new FormControl("", [Validators.required]),
      current_state: new FormControl("", [Validators.required]),
      current_country: new FormControl("", [Validators.required]),
      permanent_address: new FormControl("", [Validators.required]),
      permanent_city: new FormControl("", [Validators.required]),
      permanent_pin: new FormControl("", [Validators.required]),
      permanent_taluka: new FormControl("", [Validators.required]),
      permanent_district: new FormControl("", [Validators.required]),
      permanent_state: new FormControl("", [Validators.required]),
      permanent_country: new FormControl("", [Validators.required]),
      gender_id: new FormControl("", [Validators.required]),
      gender_name: new FormControl("", [Validators.required]),
      religion_id: new FormControl(""),
      religion_name: new FormControl(""),
      caste_id: new FormControl(""),
      caste_name: new FormControl(""),
      category_id: new FormControl(""),
      category_name: new FormControl(""),
      blood_group_id: new FormControl(""),
      blood_group_name: new FormControl(""),
      link: new FormControl(""),
      nationality: new FormControl("India", [Validators.required]),
    }),
    qualification_info: new FormGroup({
      institute_name: new FormControl(""),
      university_name: new FormControl(""),
      qualification_name: new FormControl(""),
      graduation_date: new FormControl(""),
      qualification_type: new FormControl(""),
      total_per: new FormControl(""),
      scored_per: new FormControl(""),
    }),
  });

  get employee_info(): any {
    return this.employeeForm.get("employee_info");
  }

  get qualification_info(): any {
    return this.employeeForm.get("qualification_info");
  }
  constructor(public datepipe: DatePipe, public toster: ToastrService, public employeeService: EmployeeService, public apiService: ApiService, public dialog: MatDialog, public router: Router, public dialogRef: MatDialogRef<AddNewComponent>, @Inject(MAT_DIALOG_DATA) public dialogdata: any) {}

  ngOnInit(): void {
    this.submitDisable = false;
    this.dataFetch = false;
    // console.log(this.dialogdata);
    this.apiService
      .getTypeRequest("admission_form_data")
      .toPromise()
      .then((result: any) => {
        this.bloodGroupList = result.data["blood_group"];
        this.genderList = result.data["gender"];
        this.categoryList = result.data["category"];
        this.casteList = result.data["caste"];
        this.religionList = result.data["religion"];
      });
    if (this.dialogdata?.item_id) {
      this.navigation = "allow";
      this.dataFetch = true;
      this.apiService.getTypeRequest("employee_profile/" + this.dialogdata.item_id).subscribe((result: any) => {
        // console.log(result);
        if (result.result) {
          result.data.employee_info.generate_emp_no = false;
          this.employee_info.setValue(result.data.employee_info);
        }
        this.dataFetch = false;
      });
    }
  }

  copyAddress() {
    this.employee_info.patchValue({
      current_address: this.employeeForm.get("employee_info.permanent_address").value,
      current_city: this.employeeForm.get("employee_info.permanent_city").value,
      current_pin: this.employeeForm.get("employee_info.permanent_pin").value,
      current_taluka: this.employeeForm.get("employee_info.permanent_taluka").value,
      current_district: this.employeeForm.get("employee_info.permanent_district").value,
      current_state: this.employeeForm.get("employee_info.permanent_state").value,
      current_country: this.employeeForm.get("employee_info.permanent_country").value,
    });
    this.employeeForm.updateValueAndValidity();
  }

  addBloodGroup() {
    const dialogRef = this.dialog.open(BloodGroupComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest("dropdown_data/BLOOD_GROUP").subscribe((result: any) => {
          this.bloodGroupList = result.data;
        });
      }
    });
  }

  addGender() {
    const dialogRef = this.dialog.open(GenderComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService
          .getTypeRequest("dropdown_data/GENDER")
          .toPromise()
          .then((result: any) => {
            this.genderList = result.data;
          });
      }
    });
  }

  addCaste() {
    const dialogRef = this.dialog.open(CasteComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest("dropdown_data/CASTE").subscribe((result: any) => {
          this.casteList = result.data;
        });
      }
    });
  }

  addReligion() {
    const dialogRef = this.dialog.open(ReligionComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest("dropdown_data/RELIGION").subscribe((result: any) => {
          this.religionList = result.data;
        });
      }
    });
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest("dropdown_data/CATEGORY").subscribe((result: any) => {
          this.categoryList = result.data;
        });
      }
    });
  }

  logErrors() {
    // console.log(this.employee_info);
  }

  submit() {
    if (this.employeeForm.value) {
      // console.log(this.employeeForm.value);
      this.submitDisable = true;
      if (!this.dialogdata?.item_id) {
        this.apiService.postTypeRequest("register_employee", this.employeeForm.value).subscribe((result: any) => {
          if (result.result) {
            this.toster.success("Data Added Successfully");
            this.employeeService.setSelectedEmployee(result.data);
            this.router.navigate(["/employee/allEmployees"]);
          } else {
            this.submitDisable = false;
          }
        });
      } else {
        this.apiService.postTypeRequest("update_employee", this.employeeForm.value).subscribe((result: any) => {
          if (result.result) {
            this.toster.success("Data Added Successfully");
            this.dialogRef.close(true);
          } else {
            this.submitDisable = false;
          }
        });
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
}
