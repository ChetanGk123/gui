import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/shared/services/auth/api.service';

@Component({
  selector: 'app-map-teachers',
  templateUrl: './map-teachers.component.html',
  styleUrls: ['./map-teachers.component.scss']
})
export class MapTeachersComponent implements OnInit {
  public isFilter: boolean = true;
  selectedTeachers= [];
  constructor(public config: DynamicDialogConfig, public apiService: ApiService, public toster:ToastrService,public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    // console.log(this.config.data);
    this.selectedTeachers = this.config.data.selectedTeachers;
    var data = {
      academic_id:this.config.data.data.academic_id,
      department_id:this.config.data.data.department_id,
      class_id:this.config.data.data.class_id,
      division_id:this.config.data.data.division_id,
    }
    this.apiService
        .postTypeRequest("academic_attributes_data", data)
        .toPromise()
        .then((result: any) => {
          // console.log(result);
          if(result.result){
          }
        })
  }

  submit(){
    // console.log(this.selectedTeachers);
    // console.log(this.config.data);
    /* {
      "subject_allocation_id": 9,
      "academic_id": 1,
      "academic_year_name": "2022-23",
      "department_id": 1,
      "department": "ENGLISH",
      "division_id": 1,
      "class_name": "UKG",
      "division_id": 1,
      "division_name": "A",
      "subject_id": 1,
      "subject_name": "English",
      "teachers": {
          "teacher_allocation_id": 3,
          "subject_allocation_id": 9,
          "employee_id": 2,
          "teacher_id": 2,
          "serial_no": 1,
          "employee_no": "0001",
          "employee_name": "chetan g k",
          "photo": "https://thetechvaidya.com/school/uploads/general_docs/default_photo.png"
      },
      "max_marks": null
  } */

  /* {   
    "teacher_allocation_id":1, // only to update & delete
    "subject_allocation_id":14,
    "teacher_ids":[2,2,2],
    "teacher_id":3 // only to update
} */
  }
  cancel(){}
}
