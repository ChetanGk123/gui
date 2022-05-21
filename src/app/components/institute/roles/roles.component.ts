import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { AddRoleComponent } from './add-role/add-role.component';

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  List:any[] = []
  RoleGroup:any[] = []
  dataFetch: boolean = false;
  filterValue:string = "";
  constructor(public apiService:ApiService,public dialog:MatDialog,public toster:ToastrService) { }

  ngOnInit(){
    this.dataFetch = true
    this.apiService.getTypeRequest('table_data/ROLES').subscribe((result:any) => {
      this.List = result.data
      this.RoleGroup = result.data
      this.dataFetch = false
    })
  }

  onClear(){
    
  }

  onFilter(value){
    // this.editValue = value;
    // this.List =[];
    // this.RoleGroup.filter( (x) => {
    //   if(x.name.toLowerCase().includes(value.toLowerCase()))
    //   this.List.push(x)
    // })
  }

  onAdd(){
    const dialogRef = this.dialog.open(AddRoleComponent,{data:{},width:"40%"})
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.ngOnInit()
      }
    })
  }

  async onDelete(id:string){
    var Request_Data = {
      role_id:id
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure, you want to delete?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.apiService
          .postTypeRequest("role/delete", Request_Data)
          .toPromise()
          .then((result: any) => {
            if (result.result) {
              this.toster.warning("Data deleted");
              swalWithBootstrapButtons.fire(
                'Deleted!',
                result.message,
                'success'
              )
              this.ngOnInit();
            } else {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                result.message,
                'error'
              )
              this.toster.error(result.message);
            }
          });
      } 
    })
  }
}
