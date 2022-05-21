import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export interface MarksGrading{
  slNo:number,
  gradeName: string,
  percentFrom:number,
  percentUpto:number,
  status:string
}

@Component({
  selector: 'app-marks-grading',
  templateUrl: './marks-grading.component.html',
  styleUrls: ['./marks-grading.component.scss']
})
export class MarksGradingComponent implements OnInit {

  editIndex = -1;
  marksGrading: MarksGrading[] = [];
  constructor(public toastr:ToastrService) { }

  ngOnInit(): void {
  }

  addSchoolHistory(){
    
     this.marksGrading.push({
      slNo:this.marksGrading.length +1,
      gradeName:'',
      percentFrom:null,
      percentUpto:null,
      status:'',
    })
    this.editIndex = this.marksGrading.length -1;
  }

  updateGrades(){
    this.toastr.success("Data Updated")
  }

}
