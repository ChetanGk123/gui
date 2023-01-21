import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { forkJoin } from "rxjs";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { MapNewSubjectComponent } from "./map-new-subject/map-new-subject.component";

@Component({
  selector: "app-map-subjects",
  templateUrl: "./map-subjects.component.html",
  styleUrls: ["./map-subjects.component.scss"],
})
export class MapSubjectsComponent implements OnInit {

  dataFetch:boolean = false;
  public isFilter: boolean = true;
  currentAcademicYear
  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  divisionList: any[] = [];
  subjectList: any[] = [];
  teacherList: any[] = [];
  mappedSubjects: any[] = [];
  constructor(public apiService: ApiService, public spinner: SpinnerService, public toster: ToastrService,
    public dialogService: DialogService,) {}

  commonForm: FormGroup = new FormGroup({
    subject_allocation_id: new FormControl(""),
    academic_id: new FormControl(""),
    department_id: new FormControl(""),
    class_id: new FormControl(""),
    division_id: new FormControl(""),
  });
  ngOnInit(): void {
    this.dataFetch = true,
    this.apiService.getTypeRequest("dropdown_data/ACADEMIC_YEAR").subscribe((result: any) => {
      this.academinYearList = result.data;
      this.fetchData()
      });
  }

  fetchFilterData(){
    this.fetchData()
  }

  fetchData() {
    forkJoin([
      (
        this.dataFetch = true,
        this.apiService
      .postTypeRequest("subject_allocation_data",this.commonForm.value)
      .toPromise()
      .then((result: any) => {
        this.dataFetch = false;
        this.mappedSubjects = result.data;
        /* {
          "subject_allocation_id": 4,
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
          "teachers": [],
          "max_marks": null
      } */
      })
      ),
      (
        this.dataFetch = true,
        this.apiService
      .getTypeRequest("admission_form_data")
      .toPromise()
      .then((result: any) => {
        this.dataFetch = false;
        this.academinYearList = result.data["academic_year"];
        this.departmentList = result.data["department"];
        this.classList = result.data["class"];
        this.divisionList = result.data["division"];

        /* this.academinYearList = result.data["academic_year"];
        this.bloodGroupList = result.data["blood_group"];
        this.genderList = result.data["gender"];
        this.categoryList = result.data["category"];
        this.casteList = result.data["caste"];
        this.religionList = result.data["religion"];
        this.departmentList = result.data["department"];
        this.classList = result.data["class"];
        this.divisionList = result.data["division"]; */
      })
      )
      ,(
        this.apiService
      .getTypeRequest("table_data/SUBJECT")
      .toPromise()
      .then((result: any) => {
        this.subjectList = result.data;
      })
      )
    ]);
  }

  clearData(){
        this.commonForm.reset({
          subject_allocation_id:"",
          academic_id:"",
          department_id:"",
          class_id:"",
          division_id:"",
        })
    }

  addSubjects(){
    const ref = this.dialogService.open(MapNewSubjectComponent, {
      data: {
        operation:'insert',
        academinYearList:this.academinYearList ,
        departmentList:this.departmentList ,
        classList:this.classList ,
        divisionList:this.divisionList ,
        subjectList:this.subjectList ,
      },
      header: `Map New Subjects`,
      styleClass: 'w-10 sm:w-10 md:w-10 lg:w-6',
  });
  ref.onClose.subscribe((result: any) => {
      if (result) {
          this.fetchData();
      }
  });
  }

  updateSubject(data:any){
    const ref = this.dialogService.open(MapNewSubjectComponent, {
      data: {
        operation:'update',
        updateDeleteData:data,
        academinYearList:this.academinYearList ,
        departmentList:this.departmentList ,
        classList:this.classList ,
        divisionList:this.divisionList ,
        subjectList:this.subjectList ,
      },
      header: `Map New Subjects`,
      styleClass: 'w-10 sm:w-10 md:w-10 lg:w-6',
  });
  ref.onClose.subscribe((result: any) => {
      if (result) {
          this.fetchData();
      }
  });
    
  }
  deleteSubject(data:any){
    const ref = this.dialogService.open(MapNewSubjectComponent, {
      data: {
        operation:'delete',
        updateDeleteData:data,
        academinYearList:this.academinYearList ,
        departmentList:this.departmentList ,
        classList:this.classList ,
        divisionList:this.divisionList ,
        subjectList:this.subjectList ,
      },
      header: `Map New Subjects`,
      styleClass: 'w-10 sm:w-10 md:w-10 lg:w-6',
  });
  ref.onClose.subscribe((result: any) => {
      if (result) {
          this.fetchData();
      }
  });
  }

  submit(){
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
