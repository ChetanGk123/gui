import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {

  constructor(private _toastrService: HotToastService,) { }

  ngOnInit(): void {
    this._toastrService.success("You have successfully logged in as an  user to Vuexy. Now you can start to explore. Enjoy! 🎉");

  }

}
