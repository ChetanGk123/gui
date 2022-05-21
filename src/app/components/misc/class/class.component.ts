import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  public isClassFilter:boolean = true;
  public addLoader:boolean = false;
  classeditIndex = -1;
  dataFetch: boolean = false;
  classeditValue:string
  classList:any = []
  class:any = []

  constructor(public apiService:ApiService,private dialog: DialogService, public spinner:SpinnerService, public toster:ToastrService,public dialogRef: MatDialogRef<ClassComponent>) { }

  ngOnInit(): void {
    this.dataFetch = true
    this.addLoader = false
    this.apiService.getTypeRequest('dropdown_data/CLASS').subscribe((result:any) => {
      this.classList = result.data
      this.class = result.data
      this.dataFetch = false
    })
  }

  classeditClick(index,data){
    this.classeditValue = data.name
    this.classeditIndex = index;
    
  }

  updateClass(data){
    this.addLoader = true
    this.dataFetch = true
    var Request_Data = {
      item_id:data,
      item_name:this.classeditValue
    }
    // this.dialog
    //   .confirmDialog({
    //     title: 'Are you sure?',
    //     message: 'Perviously registered data will be affected?',
    //     confirmCaption: 'Yes',
    //     cancelCaption: 'No',
    //   })
    //   .subscribe((yes) => {
    //     if (yes){
        
    //     this.apiService.postTypeRequest('update_item/CLASS',Class).subscribe((result:any) => {
    //       if(result.result){
    //         this.classList = result.data;
    //         this.class = result.data;
    //         this.ngOnInit()
    //         this.toster.success("Data Updated Successfully")
    //       }
    //       else{
    //         this.toster.error(result.message)
    //       }
          
    //     })
    //   }
    //   });
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
          .postTypeRequest("update_item/CLASS", Request_Data)
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
    this.classeditIndex = -1;
    this.dialogRef.close(true)
  }

  onClassFilter(value){
    this.classeditValue = value;
    this.classList =[];
    this.class.filter( (x) => {
      if(x.name.toLowerCase().includes(value.toLowerCase()))
      this.classList.push(x)
    })
  }

  onAddNewClass(){
    this.addLoader = true
    this.dataFetch = true
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    if(this.classeditValue.length > 0){
      var classData = {
        item_name:this.classeditValue
      }
      this.apiService.postTypeRequest('register_new_item/CLASS',classData).subscribe((result:any) => {
        if(result.result){
          this.class = result.data
          this.classList = result.data
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
    this.classeditValue = "";
    this.dialogRef.close(true)
  }

  async onDeleteClass(id:string){
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
          .postTypeRequest("delete_item/CLASS", Request_Data)
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
