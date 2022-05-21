import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Toast, ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { profileListDetails } from "../../student/all-students/all-students.component";
import { FeeService } from "../Service/fee.service";

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: "app-bulk-assign",
  templateUrl: "./bulk-assign.component.html",
  styleUrls: ["./bulk-assign.component.scss"],
})
export class BulkAssignComponent implements OnInit {
  public isFilter: boolean = true;
  StudentList: any = [];
  Students: any = [];
  selectedStudents: any = [];
  temp: any = [];
  rows: any = [];
  feeComponent: any = this.feeService.getFeeGroup;
  feeComponents: any = [];
  feeComponentList: any = [];
  feeNotes: string = '';
  academicYearList: any = [];
  departmentList: any = [];
  classList: any = [];
  dataFetch: boolean = false;
  filterForm: FormGroup = new FormGroup({
    academicYear: new FormControl(""),
    department: new FormControl(""),
    class: new FormControl(""),
    studentName: new FormControl(""),
  });
  profileList: profileListDetails;
  constructor(public apiService: ApiService, public feeService: FeeService,public router:Router, public toster:ToastrService) {
    this.isRowSelectable = this.isRowSelectable.bind(this);
  }

  ngOnInit(): void {
    if(this.feeComponent?.group_id)
    {
      this.dataFetch = true
      this.apiService
      .getTypeRequest(`fee_component/by_group/${this.feeComponent.group_id}`)
      .subscribe((result: any) => {
        this.feeComponents = result.data;
        result.data.forEach(element => {
          const feecomp = {
            component_name:element.component_name,
            fee_component_id: element.fee_component_id,
            discount:0,
            applicable_fees:element.fees
          }
        this.feeComponentList.push(feecomp)
        });
      });
    this.apiService
      .getTypeRequest("dropdown_data/ACADEMIC_YEAR")
      .subscribe((result: any) => {
        this.academicYearList = result.data;
      });
    this.apiService
      .getTypeRequest("dropdown_data/DEPARTMENT")
      .subscribe((result: any) => {
        this.departmentList = result.data;
      });
    this.apiService
      .getTypeRequest("dropdown_data/CLASS")
      .subscribe((result: any) => {
        this.classList = result.data;
      });
    this.apiService
      .getTypeRequest("all_student_for_fee")
      .subscribe((result: any) => {
        if (result.result) {
          
          this.dataFetch = false;
          result.data.forEach((data) => {
            this.Students.push(data);
          });
          this.StudentList = this.Students;
        }
      });
    }
    else{
      this.router.navigate(['/fees/feeComponents'])
    }
  }

  onFilterData(value) {
    this.StudentList = [];
    this.Students.filter((x) => {
      if (
        (this.filterForm.get("academicYear").value
          ? x.academic_year.includes(this.filterForm.get("academicYear").value)
          : true) &&
        (this.filterForm.get("department").value
          ? x.department.includes(this.filterForm.get("department").value)
          : true) &&
        (this.filterForm.get("class").value
          ? x.class.includes(this.filterForm.get("class").value)
          : true) &&
        (x.student_name.toLowerCase().includes(value.toLowerCase()) ||
          x.admission_no.toString().includes(value))
      ) {
        this.StudentList.push(x);
      }
    });
  }

  reset(){
    this.filterForm.reset({
      academicYear:'',
      department: '',
      class: '',
      studentName: '',
    })
  }

  updateFees(data){
  let applicable_fee =  this.feeComponents.find(x => x.fee_component_id == data.fee_component_id).fees
  this.feeComponentList.find(x => x.fee_component_id == data.fee_component_id).applicable_fees = applicable_fee - data.discount??0
  }

  updateFeeList(){
    this.feeComponentList.forEach(feeComponent => {
        feeComponent.discount = feeComponent.discount>0?feeComponent.discount:0;
    });
  }

  assignFee(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    let studentIdList:any = [];
    let feeComponentList:any = [];
    this.selectedStudents.forEach(student => {
      studentIdList.push(student.student_id)
    });
    if(studentIdList.length > 0){
    this.feeComponentList.forEach(feeComponent => {
      const fee = {
        fee_component_id:feeComponent.fee_component_id,
        discount:feeComponent.discount>0?feeComponent.discount:0,
        applicable_fees: feeComponent.applicable_fees
      }
      feeComponentList.push(fee)
    });
    const feeDetails = {
      fee_group_id:this.feeComponent.group_id, //mandatory
      student_ids:studentIdList, //mandatory
      fee_component_data:feeComponentList,
      notes:this.feeNotes
    }
    this.apiService.postTypeRequest('assign_fee/by_student',feeDetails).subscribe((result:any)=>{
      if(result.result){
        this.toster.success("Data Updated");
        swalWithBootstrapButtons.fire(
          'Added!',
          result.message,
          'success'
        )
        this.router.navigate(['/fees/feeComponents'])
      }
      else{
        this.toster.error(result.message);
      }
    })
  }
  else{
    
  }
  }

  isRowSelectable(event:any){
   return !this.isFeeAsigned(event.data);
  }

  isFeeAsigned(data:any){
    let feeAvailable = false
      
      for (const iterator of data.assigned_fee) {
        if(iterator.fee_group_id == this.feeComponent.group_id){
          feeAvailable = true
          break;
        }
      }
    return feeAvailable
  }
  
}