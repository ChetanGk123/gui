import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPwdComponent implements OnInit {

  Loader:boolean = false
  constructor() { }

  ngOnInit() {

   }

   changePassword(){
     this.Loader = true;
   }

   cancel(){
     this.Loader = false
   }
}
