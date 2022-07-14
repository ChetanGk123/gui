import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/auth/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { EmployeeService } from '../../../shared/services/employee/employee.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent implements OnInit {
  layout = "grid";
  public isFilter: boolean = true;
  dataFetch: boolean = false;
  EmployeeList: any = [];
  Employees: any = [];
  page = 1;
  pageSize = 12;
  filterForm: FormGroup = new FormGroup({
    employeeName: new FormControl(''),
    EmpId: new FormControl(''),
    JoinDate: new FormControl(''),
    mobile: new FormControl(''),
    
  })
  constructor(
    public exportexcel: ExcelService,
    public router: Router,
    public apiService: ApiService,
    public authService: AuthService,
    public toast: ToastrService,
    public employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.fetchApiData()
  }

  fetchApiData(){
    this.dataFetch = true
    this.apiService.getTypeRequest("new_table_data/ALL_EMPLOYEES").subscribe((result: any) => {
      if (result.result) {
        this.dataFetch = false;
        this.Employees = result.data;
        this.EmployeeList = this.Employees;
      }
      else{
        this.toast.error(result.message)
      }
      this.dataFetch = false
    });
  }

  employeeDetails(employee){
    this.employeeService.setSelectedEmployee(employee);
    this.employeeService.setSelectedTab("Profile");
    this.router.navigate(["/employee/employeeInfo"]);
  }

  onFilterData(data:any){
    // console.log(data);
    
    this.EmployeeList = [];
    this.Employees.some((x:any)=>{
      if(x.employee_name.toLowerCase().includes(data) || x.joining_date.includes(data) || x.mobile.includes(data) || x.employee_no.includes(data)){
        this.EmployeeList.push(x)
      }
    })
  }

  exportCsv() {
    this.exportexcel.exportAsExcelFile(this.EmployeeList, "Employee List");
  }
}
