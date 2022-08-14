import { Component, OnInit, ChangeDetectionStrategy, Inject } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { StudentService } from "src/app/shared/services/student_services/student.service";
import { academic_info, AdmissionForm, parent_info, schoolHistory, student_info } from "../../../shared/model/admissionForm";
import { AcademicYearComponent } from "../../misc/academic-year/academic-year.component";
import { BloodGroupComponent } from "../../misc/blood-group/blood-group.component";
import { CasteComponent } from "../../misc/caste/caste.component";
import { CategoryComponent } from "../../misc/category/category.component";
import { ClassComponent } from "../../misc/class/class.component";
import { DepartmentComponent } from "../../misc/department/department.component";
import { DivisionComponent } from "../../misc/division/division.component";
import { GenderComponent } from "../../misc/gender/gender.component";
import { ReligionComponent } from "../../misc/religion/religion.component";
import { DatePipe } from "@angular/common";
export interface fileUpload {
  slNo: number;
  fileType: string;
  fileName: string;
  fileTypeCode: number;
  file: File;
}

@Component({
  selector: "app-add-new",
  templateUrl: "./add-new.component.html",
  styleUrls: ["./add-new.component.scss"],
})
export class AddNewComponent implements OnInit {
  dataUpdated: boolean = false;
  submitDisable: boolean = false;
  isRelationShipEdit: boolean;
  editIndex = -1;
  fileeditIndex = -1;
  studentForm: FormGroup = new FormGroup({
    student_id: new FormControl(""),
    generate_admission_no: new FormControl(true, [Validators.required]),
    admission_date: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required]),
    f_name: new FormControl("", [Validators.required]),
    m_name: new FormControl("", [Validators.required]),
    l_name: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    dob_in_words: new FormControl(),
    nationality: new FormControl("Indian", [Validators.required]),
    current_address: new FormControl("", [Validators.required]),
    permanent_address: new FormControl("", [Validators.required]),
    religion_id: new FormControl("", [Validators.required]),
    caste_id: new FormControl("", [Validators.required]),
    category_id: new FormControl("", [Validators.required]),
    gender_id: new FormControl("", [Validators.required]),
    place_of_birth: new FormControl("", [Validators.required]),
    current_city: new FormControl("", [Validators.required]),
    current_pin: new FormControl("", [Validators.required]),
    current_taluka: new FormControl("", [Validators.required]),
    current_district: new FormControl("", [Validators.required]),
    current_state: new FormControl("Karnataka", [Validators.required]),
    current_country: new FormControl("India", [Validators.required]),
    permanent_city: new FormControl("", [Validators.required]),
    permanent_pin: new FormControl("", [Validators.required]),
    permanent_taluka: new FormControl("", [Validators.required]),
    permanent_district: new FormControl("", [Validators.required]),
    permanent_state: new FormControl("Karnataka", [Validators.required]),
    permanent_country: new FormControl("India", [Validators.required]),
    admission_no: new FormControl(""),
    sats_no: new FormControl(""),
    email: new FormControl("", [Validators.email]),
    mobile: new FormControl("", [Validators.minLength(10), Validators.maxLength(12)]),
    height: new FormControl(""),
    weight: new FormControl(""),
    bg_id: new FormControl(""),
    languages_studied: new FormControl(""),
    previous_medium_of_instrutcion: new FormControl(""),
    is_special_needs: new FormControl(""),
    special_needs: new FormControl(""),
  });
  parentForm: FormGroup;
  academicForm: FormGroup;
  academicHistoryForm: FormGroup;
  schoolHistoryList: schoolHistory[] = [];
  newschoolHistory: schoolHistory;

  fileList: fileUpload[] = [];
  newFile: fileUpload;

  navigation = "visited";
  dataFetch: boolean = false;
  academinYearList: any[];
  departmentList: any[];
  classList: any[];
  divisionList: any[];
  casteList: any[];
  categoryList: any[];
  genderList: any[];
  religionList: any[];
  bloodGroupList: any[];
  docTypeList: any[];
  // admissionFormDetails:AdmissionForm
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    public toster: ToastrService,
    public apiService: ApiService,
    public dialog: MatDialog,
    public studentService: StudentService,
    public router: Router,
    public dialogRef: MatDialogRef<AddNewComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogdata: any
  ) {}

  async ngOnInit() {
    this.submitDisable = false;
    // console.log(this.dialogdata);

    //await this.fetchApiData();
    if (this.dialogdata?.item_id) {
      this.navigation = "allow";
      this.dataFetch = true;
      var data;
      await this.apiService.getTypeRequest("student_data/" + this.dialogdata.item_id).subscribe((result: any) => {
        data = result.data.academic_info;
        let allocation_date = new Date();
        if (data.a_admission_date != "00-00-0000") {
          allocation_date = data.a_admission_date.split("-");
          this.academicForm.patchValue({
            allocation_date: this.datepipe.transform(new Date(allocation_date[2] + "/" + allocation_date[1] + "/" + allocation_date[0]), "yyyy-MM-dd"),
          });
        } else {
          this.academicForm.patchValue({
            allocation_date: "",
          });
        }
        this.academicForm.patchValue({
          academic_year_id: data.academic_year_id ?? "",
          class_id: data.class_id ?? "",
          dept_id: data.dept_id ?? "",
          division_id: data.division_id ?? "",
        }),
          this.academicForm.updateValueAndValidity();
        data = result.data.parent_info;
        this.parentForm.patchValue({
          father_education: data.father_education ?? "",
          father_income: data.father_income ?? "",
          father_occupation: data.father_occupation ?? "",
          fathers_email: data.fathers_email ?? "",
          fathers_mobile: data.fathers_mobile ?? "",
          fathers_name: data.fathers_name ?? "",
          guardian_address: data.guardian_address ?? "",
          guardian_relation: data.guardian_relation ?? "",
          guardians_email: data.guardians_email ?? "",
          guardians_mobile: data.guardians_mobile ?? "",
          guardians_name: data.guardians_name ?? "",
          guardians_occupation: data.guardians_occupation ?? "",
          mother_education: data.mother_education ?? "",
          mother_income: data.mother_income ?? "",
          mothers_email: data.mothers_email ?? "",
          mothers_mobile: data.mothers_mobile ?? "",
          mothers_name: data.mothers_name ?? "",
          mothers_occupation: data.mothers_occupation ?? "",
          no_of_brothers: data.no_of_brothers ?? "",
          no_of_family_members: data.no_of_family_members ?? "",
          no_of_sisters: data.no_of_sisters ?? "",
        });
        this.parentForm.updateValueAndValidity();
        data = result.data.student_info;
        let i = data.admission_date.split("-");
        let e = data.dob.split("-");
        this.studentForm.patchValue({
          admission_date: this.datepipe.transform(new Date(i[2] + "/" + i[1] + "/" + i[0]), "yyyy-MM-dd"),
          admission_no: data.admission_no ?? "",
          nationality: data.nationality ?? "",
          bg_id: data.bg_id ?? "",
          caste_id: data.caste_id ?? "",
          category_id: data.category_id ?? "",
          current_address: data.current_address ?? "",
          dob: this.datepipe.transform(new Date(e[2] + "/" + e[1] + "/" + e[0]), "yyyy-MM-dd"),
          dob_in_words: data.dob_in_words ?? "",
          email: data.email ?? "",
          f_name: data.f_name ?? "",
          gender_id: data.gender_id ?? "",
          generate_admission_no: true,
          height: data.height ?? "",
          weight: data.weight ?? "",
          is_special_needs: data.is_special_needs ?? "",
          l_name: data.l_name ?? "",
          languages_studied: data.languages_studied ?? "",
          m_name: data.m_name ?? "",
          mobile: data.mobile ?? "",
          permanent_address: data.permanent_address ?? "",
          previous_medium_of_instrutcion: data.previous_medium_of_instrutcion ?? "",
          religion_id: data.religion_id ?? "",
          sats_no: data.sats_no ?? "",
          special_needs: data.special_needs ?? "",
          student_id: data.student_id ?? "",
          current_city: data.current_city ?? "",
          current_pin: data.current_pin ?? "",
          current_taluka: data.current_taluka ?? "",
          current_district: data.current_district ?? "",
          current_state: data.current_state ?? "",
          current_country: data.current_country ?? "",
          permanent_city: data.permanent_city ?? "",
          permanent_pin: data.permanent_pin ?? "",
          permanent_taluka: data.permanent_taluka ?? "",
          permanent_district: data.permanent_district ?? "",
          permanent_state: data.permanent_state ?? "",
          permanent_country: data.permanent_country ?? "",
          place_of_birth: data.place_of_birth ?? "",
        });
        this.studentForm.updateValueAndValidity();
        data = result.data.previous_academic;
        data.forEach((element) => {
          this.schoolHistoryList.push(element);
        });
        this.dataFetch = false;
      });
    }
    this.newApiData();

    this.parentForm = this.fb.group({
      fathers_name: ["", [Validators.required]],
      mothers_name: ["", [Validators.required]],
      guardian_relation: ["", [Validators.required]],
      guardians_name: ["", [Validators.required]],
      guardians_mobile: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      guardian_address: [""],
      fathers_mobile: ["", [Validators.minLength(10), Validators.maxLength(12)]],
      fathers_email: ["", [Validators.email]],
      father_occupation: [""],
      father_education: [""],
      father_income: [""],
      mother_education: [""],
      mother_income: [""],
      mothers_occupation: [""],
      mothers_mobile: ["", [Validators.minLength(10), Validators.maxLength(12)]],
      mothers_email: ["", [Validators.email]],
      guardians_email: ["", [Validators.email]],
      guardians_occupation: [""],
      no_of_family_members: [""],
      no_of_brothers: [""],
      no_of_sisters: [""],
    });

    this.academicForm = this.fb.group({
      academic_year_id: ["", [Validators.required]],
      dept_id: ["", [Validators.required]],
      class_id: ["", [Validators.required]],
      allocation_date: [new Date().toISOString().substring(0, 10), [Validators.required]],
      division_id: [""],
    });

    this.academicHistoryForm = this.fb.group({
      slNo: [""],
      institution_name: [""],
      scholarship: [""],
      std_attended: [""],
      leave_date: [""],
      reason: [""],
    });
    if (this.dialogdata?.disabled) {
      this.studentForm.disable();
      this.parentForm.disable();
      this.academicForm.disable();
      this.academicForm.disable();
    }
  }

  findstudentFormInvalidControls() {
    const invalid = [];
    const controls = this.studentForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  newApiData() {
    this.apiService
      .getTypeRequest("admission_form_data")
      .toPromise()
      .then((result: any) => {
        this.academinYearList = result.data["academic_year"];
        this.bloodGroupList = result.data["blood_group"];
        this.genderList = result.data["gender"];
        this.categoryList = result.data["category"];
        this.casteList = result.data["caste"];
        this.religionList = result.data["religion"];
        this.departmentList = result.data["department"];
        this.classList = result.data["class"];
        this.divisionList = result.data["division"];
      });
  }
  async fetchApiData() {
    await this.apiService
      .getTypeRequest("admission_form_data")
      .toPromise()
      .then((result: any) => {
        this.academinYearList = result.data["academic_year"];
        this.bloodGroupList = result.data["blood_group"];
        this.genderList = result.data["gender"];
        this.categoryList = result.data["category"];
        this.casteList = result.data["caste"];
        this.religionList = result.data["religion"];
        this.departmentList = result.data["department"];
        this.classList = result.data["class"];
        this.divisionList = result.data["division"];
      });
  }

  copyAddress() {
    this.studentForm.patchValue({
      current_address: this.studentForm.get("permanent_address").value,
      current_city: this.studentForm.get("permanent_city").value,
      current_pin: this.studentForm.get("permanent_pin").value,
      current_taluka: this.studentForm.get("permanent_taluka").value,
      current_district: this.studentForm.get("permanent_district").value,
      current_state: this.studentForm.get("permanent_state").value,
      current_country: this.studentForm.get("permanent_country").value,
    });
    this.studentForm.updateValueAndValidity();
  }

  onGuardianChange(type) {
    if (type == "New") {
      this.isRelationShipEdit = false;
      this.parentForm.patchValue({
        guardian_relation: "",
        guardians_name: "",
        guardians_mobile: "",
        guardians_occupation: "",
        guardians_email: "",
        guardian_address: "",
      });
    } else if (type == "Father") {
      this.isRelationShipEdit = true;
      this.parentForm.patchValue({
        guardian_relation: "Father",
        guardians_name: this.parentForm.get("fathers_name").value,
        guardians_mobile: this.parentForm.get("fathers_mobile").value,
        guardians_occupation: this.parentForm.get("father_occupation").value,
        guardians_email: this.parentForm.get("fathers_email").value,
        guardian_address: "",
      });
    } else if (type == "Mother") {
      this.isRelationShipEdit = true;
      this.parentForm.patchValue({
        guardian_relation: "Mother",
        guardians_name: this.parentForm.get("mothers_name").value,
        guardians_mobile: this.parentForm.get("mothers_mobile").value,
        guardians_occupation: this.parentForm.get("mothers_occupation").value,
        guardians_email: this.parentForm.get("mothers_email").value,
        guardian_address: "",
      });
    }
    this.parentForm.updateValueAndValidity();
  }

  addSchoolHistory() {
    this.schoolHistoryList.push({
      slNo: this.schoolHistoryList.length + 1,
      institution_name: "",
      scholarship: "",
      std_attended: "",
      leave_date: "",
      reason: "",
    });
    this.editIndex = this.schoolHistoryList.length - 1;
  }

  data: any;
  submit() {
    this.submitDisable = true;
    if (true) {
      this.studentForm.patchValue({
        generate_admission_no: this.studentForm.get("generate_admission_no").value == true ? "1" : "0",
        is_special_needs: this.studentForm.get("is_special_needs").value == true ? "1" : "0",
      });
      var admissionFormDetails: AdmissionForm = {
        student_info: this.studentForm.value,
        parent_info: this.parentForm.value,
        academic_info: this.academicForm.value,
        previous_academic: this.schoolHistoryList,
      };

      if (!this.dialogdata?.item_id) {
        this.apiService.postTypeRequest("register_student", admissionFormDetails).subscribe((result: any) => {
          if (result.result) {
            this.toster.success("Data Added Successfully");
            // var student = {
            //   admission_no:result.data.admission_no
            // }
            this.studentService.setSelectedStudent(result.data);
            this.router.navigate(["/student/studentInfo"]);
          } else {
            this.submitDisable = false;
          }
        });
      } else {
        this.apiService.postTypeRequest("update_student", admissionFormDetails).subscribe((result: any) => {
          if (result.result) {
            this.toster.success("Data Added Successfully");
            this.dialogRef.close(true);
          } else {
            this.submitDisable = false;
          }
        });
      }
    } else {
    }
  }

  addBlooadGroup() {
    const dialogRef = this.dialog.open(BloodGroupComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest("dropdown_data/BLOOD_GROUP").subscribe((result: any) => {
          this.bloodGroupList = result.data;
        });
      }
    });
  }
  async addGender() {
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
  addCast() {
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
  addAcademicYear() {
    const dialogRef = this.dialog.open(AcademicYearComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest("dropdown_data/ACADEMIC_YEAR").subscribe((result: any) => {
          this.academinYearList = result.data;
        });
      }
    });
  }
  addDepartment() {
    const dialogRef = this.dialog.open(DepartmentComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest("dropdown_data/DEPARTMENT").subscribe((result: any) => {
          this.departmentList = result.data;
        });
      }
    });
  }
  addClass() {
    const dialogRef = this.dialog.open(ClassComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest("dropdown_data/CLASS").subscribe((result: any) => {
          this.classList = result.data;
        });
      }
    });
  }
  addDivision() {
    const dialogRef = this.dialog.open(DivisionComponent, { width: "50%" });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.getTypeRequest("dropdown_data/DIVISION").subscribe((result: any) => {
          this.divisionList = result.data;
        });
      }
    });
  }
}
