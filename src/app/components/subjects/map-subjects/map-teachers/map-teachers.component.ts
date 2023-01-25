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
  commonForm: FormGroup = new FormGroup({
    teacher_allocation_id: new FormControl(""),
    subject_allocation_id: new FormControl(""),
    academic_id: new FormControl("",[Validators.required]),
    department_id: new FormControl("",[Validators.required]),
    class_id: new FormControl("",[Validators.required]),
    division_id: new FormControl("",[Validators.required]),
    subject_ids: new FormControl([]),
    subject_id: new FormControl([]),
  });
  constructor(public config: DynamicDialogConfig, public apiService: ApiService, public toster:ToastrService,public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    console.log(this.config.data);
    this.selectedTeachers = this.config.data.selectedTeachers
  }

  submit(){
    console.log(this.selectedTeachers);
    
  }
  cancel(){}
}
