import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonComponent } from './common/common.component';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss']
})
export class MiscComponent implements OnInit {

  
  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
    const ref = this.dialogService.open(CommonComponent, {
      header: 'Choose a Car',
      width: '70%'
  });
  }

}
