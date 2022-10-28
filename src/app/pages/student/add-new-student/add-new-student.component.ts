import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss']
})
export class AddNewStudentComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getTypeRequest('check_token').subscribe((data:any)=>{
      console.log(data);

    })
  }

}
