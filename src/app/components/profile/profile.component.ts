import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPwdComponent } from '../authentication/forget-pwd/forget-pwd.component';
import { ResetPwdComponent } from '../authentication/reset-pwd/reset-pwd.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  card:string = "Personal Information";
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  setCard(cardName){
    this.card = cardName
  }

  ChangePassword(){
const dialogRef = this.dialog.open(ResetPwdComponent)
  }
}
