import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonComponent } from './common/common.component';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss']
})
export class MiscComponent implements OnInit {

  
  constructor(public dialogService: DialogService,private _toastrService: HotToastService,) { }

  ngOnInit(): void {
    
  }

  show(){
    this._toastrService.success("You have successfully logged in as an  user to Vuexy. Now you can start to explore. Enjoy! 🎉",{
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
  }

  open(){
    const ref = this.dialogService.open(CommonComponent, {
      header: 'Choose a Car',
      width: '70%'
  });
  }

}
