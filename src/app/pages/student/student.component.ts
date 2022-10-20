import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
    const ref = this.dialogService.open(AddNewStudentComponent, {
      header: 'Choose a Car',
      width: '70%'
  });
  }

}
