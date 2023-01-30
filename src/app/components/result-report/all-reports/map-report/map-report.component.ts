import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/shared/services/auth/api.service';

@Component({
  selector: 'app-map-report',
  templateUrl: './map-report.component.html',
  styleUrls: ['./map-report.component.scss']
})
export class MapReportComponent implements OnInit {

  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  data: any;
  commonForm: FormGroup = new FormGroup({
    report_id: new FormControl(""),
    report_name: new FormControl("",[Validators.required]),
    result_date: new FormControl("",[Validators.required]),
    academic_id: new FormControl("",[Validators.required]),
    department_id: new FormControl("",[Validators.required]),
    class_id: new FormControl("",[Validators.required]),
  });
  constructor(public datepipe: DatePipe,public config: DynamicDialogConfig, public apiService: ApiService, public toster:ToastrService,public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.getAcademicYears();
    if(this.config.data.operation != "insert"){
      var data = this.config.data.data;
      console.log(this.config.data);
      var dob = this.config?.data?.data.result_date.split('-');
      this.commonForm.patchValue({
        report_id:data.report_id,
        report_name:data.name,
        result_date:this.datepipe.transform(
          new Date(Number(dob[2]) + '/' + Number(dob[1]) + '/' + Number(dob[0])),
          'yyyy-MM-dd'
      ),
        academic_id:data.academic_id,
        department_id:data.department_id,
        class_id:data.class_id,
        division_id:data?.division_id??data.div_id,
      })
      this.getDepartments();
      this.getClasses();
      if(this.config.data.operation == "delete"){
        const controls = this.commonForm.controls;
    for (const control in controls) {
      controls[control].disable()
    }
      }
    }
  }

  getAcademicYears() {
    this.data = this.config.data.academic_attributes_tree
    this.config.data.academic_attributes_tree.forEach((element) => {
      if(element.department_data.length > 0)
      {
        this.academinYearList.push(element);
      }
    });
  }

  getDepartments() {
    for (const academic_year of this.data) {
      if (academic_year.academic_year_id == this.commonForm.controls.academic_id.value) {
        this.departmentList = [];
        academic_year.department_data.forEach((department) => {
          this.departmentList.push(department);
        });
        break;
      }
    }
  }
  getClasses() {
    for (const department of this.departmentList) {
      if (department.department_id == this.commonForm.controls.department_id.value) {
        this.classList = [];
        department.class_data.forEach((clas) => {
          this.classList.push(clas);
        });
        break;
      }
    }
  }

  submit(){
    console.log(this.commonForm.value);
      this.apiService.postTypeRequest(`result_report_master_ops/${this.config.data.operation}`, this.commonForm.value).subscribe((result: any) => {
        if (result.result) {
          this.toster.success(result.message);
          this.ref.close(true);
        } else {
          this.toster.error(result.message);
          this.ref.close(false);
        }
      });
  }

  cancel(){
    this.ref.close(false);
  }
}
