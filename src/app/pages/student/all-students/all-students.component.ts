import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit {

    /**
   *
   */
     constructor(public studentService:StudentService) {

    }
    ngOnInit(): void {
      this.studentService.data$.subscribe((data:any)=>{
        console.log(data);
      })

      }

}
