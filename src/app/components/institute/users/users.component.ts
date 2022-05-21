import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  products1:any[] = [{Slno:1,name:'Chetan',Role:'Admin',Login_Permission:true}];
  filterValue:any = "";
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  onAdd(){
    const dialogRef = this.dialog.open(NewUserComponent,{data:{},width:"40%"})
    dialogRef.afterClosed().subscribe((result:any)=>{
      if(result){
        this.ngOnInit();
      }
    })
  }
  onClear(){}
  onFilter(event){}
  onDelete(data){}
  update(data){
    const dialogRef = this.dialog.open(NewUserComponent,{data:data,width:"40%"})
  }
}
