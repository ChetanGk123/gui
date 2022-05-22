import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Output() newItemEvent = new EventEmitter<string>();
  
  public submitLoader: boolean = false;
  public updateTC: boolean = false;
  tcForm: FormGroup = new FormGroup({
    id: new FormControl(),
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
    public datepipe: DatePipe,
    public studentService: StudentService,) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.patchValues(changes['selectedStudent'].currentValue)
  }

  ngOnInit(): void {
  }

  patchValues(data:any){
    this.updateTC = data.application_date?true:false
    console.log(data);
    let i = data.application_date?.split("-");
    let e = data.issued_date?.split("-");
    this.tcForm.patchValue({
      id:data.id,
      name:data.student_name,
      student_id:data.student_id,
      application_date:data.application_date?this.datepipe.transform(new Date(i[2] + '/' + i[1] + '/' + i[0]), 'yyyy-MM-dd')??"":"",
      issued_date:data.issued_date?this.datepipe.transform(new Date(e[2] + '/' + e[1] + '/' + e[0]), 'yyyy-MM-dd')??"":"",
      character_of_conduct:data.character_of_conduct??"",
      no_of_days:data.no_of_days??"",
      no_of_attended_days:data.no_of_attended_days??"",
      tc_reason:data.tc_reason??"",
    })
    this.tcForm.updateValueAndValidity()
  }
  AssignTC(){
    if(this.updateTC){
      this.submitLoader = true
    this.apiService.postTypeRequest("update_tc",this.tcForm.value).subscribe((result:any)=>{
      if(result.result){
        this.toster.success("Tc Assigned")
        this.ngOnInit()
        this.router.navigate(['/student/assignedTc']);
        const dialogRef = this.dialog.open(TCComponent,{
          data:{id : this.tcForm.get('id').value},
          height: "88%",
          width: "80%",
        })
        this.newItemEvent.emit();
      }else{
        this.submitLoader = false
        this.toster.error(result.message)
      }
    })
    }else{
      this.submitLoader = true
    this.apiService.postTypeRequest("generate_tc",this.tcForm.value).subscribe((result:any)=>{
      if(result.result){
        console.log(result.data);
        this.toster.success("Tc Assigned")
        this.ngOnInit()
        this.router.navigate(['/student/assignedTc']);
        const dialogRef = this.dialog.open(TCComponent,{
          data:result.data,
          height: "88%",
          width: "80%",
        })
        this.newItemEvent.emit();
      }else{
        this.submitLoader = false
        this.toster.error(result.message)
      }
    })
    }
    
  }
}
