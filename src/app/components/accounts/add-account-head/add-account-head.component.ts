import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode, SortType, id } from '@swimlane/ngx-datatable';

import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-add-account-head',
  templateUrl: './add-account-head.component.html',
  styleUrls: ['./add-account-head.component.scss']
})
export class AddAccountHeadComponent implements OnInit {

  public isFeeGroupFilter:boolean = true;
  public submitDisable:boolean = false;
  dataFetch: boolean = false;
  editIndex = -1;
  editValue:string
  List:any[] = []
  id:number;
  institution_id:number;
  feeGroup:any[] = []
  filterValue:string = "";
  addValue:string = "";
  constructor(public apiService:ApiService,private dialog: DialogService, public spinner:SpinnerService, public toster:ToastrService) {}
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  SortType = SortType;

  ngOnInit() {
    
    this.dataFetch = true
    this.submitDisable = false
    this.addValue = ""
    this.apiService.getTypeRequest('table_data/ACCOUNT_HEAD').subscribe((result:any) => {
      this.List = result.data
      this.feeGroup = result.data
      this.dataFetch = false
    })
  }

  editClick(index,data){
    debugger;
    this.editValue = data.name
    this.editIndex = index;
    
  }

  onClear(){
    this.List = this.feeGroup;
  }

  update(data){
    this.addValue = data.account_name;
    this.id = data.account_id;
    this.institution_id = data.institution_id
  }

  onFilter(value){
    this.editValue = value;
    this.List =[];
    this.feeGroup.filter( (x) => {
      if(x.name.toLowerCase().includes(value.toLowerCase()))
      this.List.push(x)
    })
  }

  isValueAvailable(){
    var value = this.List.filter( (x) => {
      if(x.account_name.toLowerCase() ==this.addValue.toLowerCase())
     return x
    })
    return value.length> 0? false:true
  }

  onAddNew(){
    this.submitDisable = true
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    if(this.addValue.length > 0 && this.id != null){    
      var Request_Data = {
        account_id:this.id,
      account_name:this.addValue
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
          .postTypeRequest("account_head/update", Request_Data)
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
              this.Clear()
            } else {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                result.message,
                'error'
              )
              this.toster.error(result.message);
              this.submitDisable = false
            }
          });
      } 
    })
    }
    
   else if(this.addValue.length > 0 && this.isValueAvailable()){
      
      var div = {
        account_name:this.addValue
      }
      this.apiService.postTypeRequest('account_head/insert',div).subscribe((result:any) => {
        if(result.result){
          this.feeGroup = result.data
          this.List = result.data
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
          this.submitDisable = false
        }
      })
      this.addValue = ""
    }
    else if(this.addValue.length > 0){
      this.toster.error("Value alredy Exists")
      this.submitDisable = false
    }
    else{
      this.toster.error("Cannot add empty value")
      this.submitDisable = false
    }
    
  }

  Clear(){
    this.addValue="",
    this.id = null,
    this.institution_id = null
  }

}
