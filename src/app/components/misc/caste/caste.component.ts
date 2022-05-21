import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
declare var require
const Swal = require('sweetalert2')
export interface cast{
  id:number,
  name: string,
  sr: string,
}
@Component({
  selector: 'app-caste',
  templateUrl: './caste.component.html',
  styleUrls: ['./caste.component.scss']
})
export class CasteComponent implements OnInit {
  public isCasteFilter:boolean = true;
  casteditIndex = -1;
  dataFetch: boolean = false;
  public addLoader:boolean = false;
  casteeditValue:string
  casteList:any = []
  casts:any = []


  constructor(public apiService:ApiService,private dialog: DialogService, public spinner:SpinnerService, public toster:ToastrService,public dialogRef: MatDialogRef<CasteComponent>) { }

  ngOnInit() {
    this.dataFetch = true
    this.addLoader = false
    this.apiService.getTypeRequest('dropdown_data/CASTE').subscribe((result:any) => {
      this.casteList = result.data
      this.casts = result.data
      this.dataFetch = false
    })

    
  }

  casteditClick(index,data){
    this.casteeditValue = data.name
    this.casteditIndex = index;
    
  }

  updateCaste(data){
    this.addLoader = true
    this.dataFetch = true
    var Request_Data = {
      item_id:data,
      item_name:this.casteeditValue
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
          .postTypeRequest("update_item/CASTE", Request_Data)
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
    this.casteditIndex = -1;
    this.dialogRef.close(true)
  }

  onCasteFilter(value){
    this.casteeditValue = value;
    this.casteList =[];
    this.casts.filter( (x) => {
      if(x.name.toLowerCase().includes(value.toLowerCase()))
      this.casteList.push(x)
    })
  }

  onAddNewCaste(){
    this.addLoader = true
    this.dataFetch = true
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    if(this.casteeditValue.length > 0){
      var castData = {
        item_name:this.casteeditValue
      }
      this.apiService.postTypeRequest('register_new_item/CASTE',castData).subscribe((result:any) => {
        if(result.result){
          this.casteList = result.data
          this.casts = result.data
          this.ngOnInit();
          this.toster.success("New Data Added")
          swalWithBootstrapButtons.fire(
            'Added!',
            result.message,
            'success'
          )
          this.dialogRef.close(true)
        }
        else{
          this.toster.error(result.message)
          this.addLoader = false
    this.dataFetch = false
        }
      })
    }
    this.casteeditValue = ""
  }

  async onDeleteCaste(id:string){
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
          .postTypeRequest("delete_item/CASTE", Request_Data)
          .toPromise()
          .then((result: any) => {
            if (result.result) {
              this.toster.warning("Data deleted");
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
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
