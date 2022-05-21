import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { StudentService } from 'src/app/shared/services/student_services/student.service';
import { TCComponent } from '../../tc/tc.component';

@Component({
  selector: 'app-tc-details',
  templateUrl: './tc-details.component.html',
  styleUrls: ['./tc-details.component.scss']
})
export class TcDetailsComponent implements OnInit,OnChanges {
  @Input() selectedStudent:any

  public submitLoader: boolean = false;
  tcForm: FormGroup = new FormGroup({
    name: new FormControl("",[Validators.required]),
    student_id: new FormControl("",[Validators.required]),
    application_date: new FormControl((new Date()).toISOString().substring(0,10),[Validators.required]),
    issued_date: new FormControl((new Date()).toISOString().substring(0,10),[Validators.required]),
    character_of_conduct: new FormControl("",[Validators.required]),
    no_of_days: new FormControl("",[Validators.required]),
    no_of_attended_days: new FormControl("",[Validators.required]),
    tc_reason: new FormControl("",[Validators.required]),
  })
  constructor(
    public apiService:ApiService,
    public toster:ToastrService,
    public router:Router,
    public dialog:MatDialog,
    public studentService: StudentService,) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.patchValues(changes['selectedStudent'].currentValue)
  }

  ngOnInit(): void {
  }

  patchValues(data:any){
    this.tcForm.patchValue({
      name:data.name,
      student_id:data.student_id
    })
    this.tcForm.updateValueAndValidity()
  }
  AssignTC(){
    this.submitLoader = true
    this.apiService.postTypeRequest("generate_tc",this.tcForm.value).subscribe((result:any)=>{
      if(result.result){
        this.toster.success("Tc Assigned")
        this.ngOnInit()
        this.router.navigate(['/student/assignedTc']);
        const dialogRef = this.dialog.open(TCComponent,{
          data:result.data,
          height: "88%",
          width: "80%",
        })
      }else{
        this.submitLoader = false
        this.toster.error(result.message)
      }
    })
  }
}
