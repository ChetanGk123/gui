import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-blood-group',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.scss']
})
export class BloodGroupComponent implements OnInit {

  public isBloodFilter:boolean = true;
  public addLoader:boolean = false;
  bloodeditValue:string
  dataFetch: boolean = false;
  bloodeditIndex = -1;
  bloodList:any = []
  blood:any = []

  constructor(public apiService:ApiService,private dialog: DialogService, public spinner:SpinnerService, public toster:ToastrService,public dialogRef: MatDialogRef<BloodGroupComponent>,) { }

  ngOnInit(): void {
    this.dataFetch = true
    this.addLoader = false
    this.apiService.getTypeRequest('dropdown_data/BLOOD_GROUP').subscribe((result:any) => {
      this.bloodList = result.data
      this.blood = result.data
      this.dataFetch = false
    })
  }

  bloodeditClick(index,data){
    this.bloodeditValue = data.name
    this.bloodeditIndex = index;
    
  }

  updateBlood(data){
    this.addLoader = true
    this.dataFetch = true
    var Request_Data = {
      item_id:data,
      item_name:this.bloodeditValue
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure, you want to Update?',
      text: "Perviously registered data will be affected!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.apiService
          .postTypeRequest("update_item/BLOOD_GROUP", Request_Data)
          .toPromise()
          .then((result: any) => {
            if (result.result) {
              this.toster.warning("Data Updated");
              swalWithBootstrapButtons.fire(
                'Updated!',
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
              this.addLoader = false
    this.dataFetch = false
            }
          });
      } 
    })
    this.bloodeditIndex = -1;
    this.dialogRef.close(true)
  }

  onBloodFilter(value){
    this.bloodeditValue = value;
    this.bloodList =[];
    this.blood.filter( (x) => {
      if(x.name.toLowerCase().includes(value.toLowerCase()))
      this.bloodList.push(x)
    })
  }

  onAddNewBlood(){
    this.addLoader = true
    this.dataFetch = true
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    if(this.bloodeditValue.length > 0){
      var blood = {
        item_name:this.bloodeditValue
      }
      this.apiService.postTypeRequest('register_new_item/BLOOD_GROUP',blood).subscribe((result:any) => {
        if(result.result){
          this.blood = result.data
          this.bloodList = result.data
          this.ngOnInit();
          this.toster.success("New Data Added")
          swalWithBootstrapButtons.fire(
            'Added!',
            result.message,
            'success'
          )
        }
        else{
          this.toster.error(result.message)
          this.addLoader = false
    this.dataFetch = false
        }
      })
    }
    this.bloodeditValue = "";
    this.dialogRef.close(true);
  }

  async onDeleteBlood(id:string){
    this.dataFetch = true
    var Request_Data = {
      item_id:id
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
          .postTypeRequest("delete_item/BLOOD_GROUP", Request_Data)
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
              this.dataFetch = false
            }
          });
      } 
      else{
        this.dataFetch = false
      }
    })
  }
}
