import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public isCategoryFilter:boolean = true;
  public addLoader:boolean = false;
  categoryeditIndex = -1;
  dataFetch: boolean = false;
  categoryeditValue:string
  categoryList:any = []
  category:any = []
  constructor(public apiService:ApiService,private dialog: DialogService, public spinner:SpinnerService, public toster:ToastrService,public dialogRef: MatDialogRef<CategoryComponent>) { }

  ngOnInit(): void {
    this.dataFetch = true
    this.addLoader = false
    this.apiService.getTypeRequest('dropdown_data/CATEGORY').subscribe((result:any) => {
      this.categoryList = result.data
      this.category = result.data
      this.dataFetch = false
    })
  }

  categoryeditClick(index,data){
    this.categoryeditValue = data.name
    this.categoryeditIndex = index;
    
  }

  updateCategory(data){
    this.addLoader = true
    this.dataFetch = true
    var Request_Data = {
      item_id:data,
      item_name:this.categoryeditValue
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
          .postTypeRequest("update_item/CATEGORY", Request_Data)
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
            }
          });
      } 
    })
    this.categoryeditIndex = -1;
    this.dialogRef.close(true)
  }

  onCategoryFilter(value){
    this.categoryeditValue = value;
    this.categoryList =[];
    this.category.filter( (x) => {
      if(x.name.toLowerCase().includes(value.toLowerCase()))
      this.categoryList.push(x)
    })
  }

  onAddNewCategory(){
    this.addLoader = true
    this.dataFetch = true
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    if(this.categoryeditValue.length > 0){
      var category = {
        item_name:this.categoryeditValue
      }
      this.apiService.postTypeRequest('register_new_item/CATEGORY',category).subscribe((result:any) => {
        if(result.result){
          this.category = result.data
          this.categoryList = result.data
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
        }
      })
    }
    this.categoryeditValue = "";
    this.dialogRef.close(true)
  }

  async onDeleteCategory(id:string){
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
          .postTypeRequest("delete_item/CATEGORY", Request_Data)
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
