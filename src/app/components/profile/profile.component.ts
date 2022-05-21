import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPwdComponent } from '../authentication/forget-pwd/forget-pwd.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  products1:any[] = [];
  card:string = "Personal Information";
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
    this.products1 = [
      {
        code:1,
        name:'Abhi',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:2,
        name:'Basu',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:3,
        name:'chandru',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:4,
        name:'Abhi',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:1,
        name:'Abhi',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:2,
        name:'Basu',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:3,
        name:'chandru',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:4,
        name:'Abhi',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:1,
        name:'Abhi',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:2,
        name:'Basu',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:3,
        name:'chandru',
        category:'type1',
        quantity:120,
        price:123
      },
      {
        code:4,
        name:'Abhi',
        category:'type1',
        quantity:120,
        price:123
      },
    ]
  }

  setCard(cardName){
    this.card = cardName
  }

  ChangePassword(){
const dialogRef = this.dialog.open(ForgetPwdComponent,
  {height:"80%"})
  }
}
