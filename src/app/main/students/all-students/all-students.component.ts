import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit {

  constructor(private _toastrService: HotToastService,) { }

  ngOnInit(): void {
  }

  showToast(){
    this._toastrService.success("You have successfully logged in as an  user to Vuexy. Now you can start to explore. Enjoy! 🎉");
  }

}
