import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";

export interface result_report {
  academic_id?: number;
  academic_name?: string;
  record_id?: string;
  department_id?: number;
  department_name?: string;
  class_id?: number;
  class_name?: string;
  division_id?: number;
  result_criteria_group_id?: number;
  division_name?: string;
  result_date?: string;
  exam_date?: string;
}

@Component({
  selector: "app-map-report",
  templateUrl: "./map-report.component.html",
  styleUrls: ["./map-report.component.scss"],
})
export class MapReportComponent implements OnInit {
  navigation = "visited";
  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  divisionList: any[] = [];
  resultGroupList: any[] = [];
  criteriaGroupList: any[] = [];
  selectedList: result_report[] = [];
  data: any[] = [];
  selectedFile: any[] = [];
  formattedData: any[] = [];
  commonForm: FormGroup = new FormGroup({
    report_id: new FormControl(""),
    result_report_group_id: new FormControl("2", [Validators.required]),
    result_date: new FormControl("2023-03-31", [Validators.required]),
    exam_date: new FormControl("2023-03-10", [Validators.required]),
    result_criteria_group_id: new FormControl("1", [Validators.required]),
  });
  constructor(public datepipe: DatePipe, public config: DynamicDialogConfig, public apiService: ApiService, public toster: ToastrService, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.resultGroupList = this.config.data.resultGroupList
    this.criteriaGroupList = this.config.data.criteriaGroupList
    /* this.apiService.getTypeRequest("new_table_data/RESULT_REPORT_GROUP").subscribe((result: any) => {
      this.resultGroupList = result.data;
    });
    this.apiService.getTypeRequest("new_table_data/RESULT_CRITERIA_GROUP").subscribe((result: any) => {
      this.criteriaGroupList = result.data;
    }); */
    this.getAcademicYears();
    if (this.config.data.operation != "insert") {
      var data = this.config.data.data;
      console.log(this.config.data);
      var dob = this.config?.data?.data.result_date.split("-");
      this.commonForm.patchValue({
        report_id: data.report_id,
        report_name: data.name,
        result_date: this.datepipe.transform(new Date(Number(dob[2]) + "/" + Number(dob[1]) + "/" + Number(dob[0])), "yyyy-MM-dd"),
        academic_id: data.academic_id,
        department_id: data.department_id,
        class_id: data.class_id,
        division_id: data?.division_id ?? data.div_id,
      });
      /* this.getDepartments();
      this.getClasses(); */
      if (this.config.data.operation == "delete") {
        const controls = this.commonForm.controls;
        for (const control in controls) {
          controls[control].disable();
        }
      }
    }
  }

  getAcademicYears() {
    type Org = Record<string, string>;
    this.data = this.config.data.academic_attributes_tree;
    this.academinYearList = [];
    this.config.data.academic_attributes_tree.forEach((element) => {
      if (element.department_data.length > 0) {
        var data: Org = {};
        data.academic_id = element.academic_year_id;
        data.academic_name = element.academic_year_name;
        var academicData = {
          label: element.academic_year_name,
          data: { academic_id: element.academic_year_id },
          expandedIcon: "pi pi-folder-open",
          collapsedIcon: "pi pi-folder",
          children: this.getDepartments(element, data),
        };
        this.academinYearList.push(academicData);
      }
    });
    // console.log(this.academinYearList);
  }

  getDepartments(academicYear: any, parentData: any) {
    this.departmentList = [];
    academicYear.department_data.forEach((department) => {
      if (department.class_data.length > 0) {
        parentData.department_id = department.department_id;
        parentData.department_name = department.department_name;
        var departmentData = {
          label: department.department_name,
          data: { academic_id: parentData.academic_id, department_id: parentData.department_id },
          expandedIcon: "pi pi-folder-open",
          collapsedIcon: "pi pi-folder",
          children: this.getClasses(department, parentData),
        };
        this.departmentList.push(departmentData);
      }
    });
    return this.departmentList;
  }

  getClasses(department: any, parentData: any) {
    this.classList = [];
    department.class_data.forEach((class_data) => {
      if (class_data.division_data.length > 0) {
        parentData.class_id = class_data.class_id;
        parentData.class_name = class_data.class_name;
        var classData = {
          label: class_data.class_name,
          data: { academic_id: parentData.academic_id, department_id: parentData.department_id, class_id: parentData.class_id },
          expandedIcon: "pi pi-folder-open",
          collapsedIcon: "pi pi-folder",
          children: this.getDivisions(class_data, parentData),
        };
        this.classList.push(classData);
      }
    });
    return this.classList;
  }

  getDivisions(class_data: any, parentData: any) {
    this.divisionList = [];
    class_data.division_data.forEach((division) => {
      parentData.division_id = division.division_id;
      parentData.division_name = division.division_name;
      const data = { academic_id: parentData.academic_id, department_id: parentData.department_id, class_id: parentData.class_id, division_id: parentData.division_id };
      var divisionData = {
        label: division.division_name,
        data: data,
        expandedIcon: "pi pi-folder-open",
        collapsedIcon: "pi pi-folder",
      };
      const fData = {
        academic_id: parentData.academic_id,
        academic_name: parentData.academic_name,
        department_id: parentData.department_id,
        department_name: parentData.department_name,
        class_id: parentData.class_id,
        class_name: parentData.class_name,
        division_id: parentData.division_id,
        division_name: parentData.division_name,
      };
      this.formattedData.push(fData);
      this.divisionList.push(divisionData);
    });
    return this.divisionList;
  }
  /* getDepartments() {
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
  } */

  nodeSelect(event) {
    var data = event.node.data;
    if (data?.division_id) {
      this.addDivision(data);
    } else if (data?.class_id) {
      this.addClass(data);
    } else if (data?.department_id) {
      this.addDepartment(data);
    } else {
      this.addAcademicYear(data);
    }
  }

  nodeUnselect(event) {
    var data = event.node.data;
    if (data?.division_id) {
      this.removeDivision(data);
    } else if (data?.class_id) {
      this.removeClass(data);
    } else if (data?.department_id) {
      this.removeDepartment(data);
    } else {
      this.removeAcademicYear(data);
    }
  }

  addDivision(data: any) {
    this.removeDivision(data);
    const itemsToAdd = this.formattedData.filter((academinYear: any) => academinYear.academic_id === data.academic_id && academinYear.department_id === data.department_id && academinYear.class_id === data.class_id && academinYear.division_id === data.division_id);
    if (itemsToAdd.length > 0) {
      itemsToAdd.forEach((data: any) => {
        this.selectedList.push(this.getResultReport(data));
      });
    }
  }

  addClass(data: any) {
    this.removeClass(data);
    const itemsToAdd = this.formattedData.filter((academinYear: any) => academinYear.academic_id === data.academic_id && academinYear.department_id === data.department_id && academinYear.class_id === data.class_id);
    if (itemsToAdd.length > 0) {
      itemsToAdd.forEach((data: any) => {
        this.selectedList.push(this.getResultReport(data));
      });
    }
  }

  addDepartment(data: any) {
    this.removeDepartment(data);
    const itemsToAdd = this.formattedData.filter((academinYear: any) => academinYear.academic_id === data.academic_id && academinYear.department_id === data.department_id);
    if (itemsToAdd.length > 0) {
      itemsToAdd.forEach((data: any) => {
        this.selectedList.push(this.getResultReport(data));
      });
    }
  }

  addAcademicYear(data: any) {
    //data =  {academic_id: 1}
    this.removeAcademicYear(data)
    const itemsToAdd = this.formattedData.filter((academinYear: any) => academinYear.academic_id === data.academic_id);
    if (itemsToAdd.length > 0) {
      itemsToAdd.forEach((data: any) => {
        this.selectedList.push(this.getResultReport(data));
      });
    }
  }

  removeDivision(data: any) {
    const availableItems = this.selectedList.filter((academinYear: any) => academinYear.academic_id === data.academic_id && academinYear.department_id === data.department_id && academinYear.class_id === data.class_id && academinYear.division_id === data.division_id);
    if (availableItems.length > 0) {
      const removedItems = availableItems.forEach(f =>{
        this.selectedList.splice(
          this.selectedList.findIndex((academinYear: any) => academinYear.academic_id === f.academic_id && academinYear.department_id === data.department_id && academinYear.class_id === data.class_id && academinYear.division_id === data.division_id),
          1
        );
      }) 
    }
  }

  removeClass(data: any) {
    const availableItems = this.selectedList.filter((academinYear: any) => academinYear.academic_id === data.academic_id && academinYear.department_id === data.department_id && academinYear.class_id === data.class_id);
    if (availableItems.length > 0) {
      const removedItems = availableItems.forEach(f =>{
        this.selectedList.splice(
          this.selectedList.findIndex((academinYear: any) => academinYear.academic_id === f.academic_id && academinYear.department_id === data.department_id && academinYear.class_id === data.class_id),
          1
        );
      }) 
    }
  }

  removeDepartment(data: any) {
    const availableItems = this.selectedList.filter((academinYear: any) => academinYear.academic_id === data.academic_id && academinYear.department_id === data.department_id);
    if (availableItems.length > 0) {
      const removedItems = availableItems.forEach(f =>{
        this.selectedList.splice(
          this.selectedList.findIndex((academinYear: any) => academinYear.academic_id === f.academic_id && academinYear.department_id === data.department_id),
          1
        );
      }) 
    }
  }

  removeAcademicYear(data: any) {
    const availableItems = this.selectedList.filter((academinYear: any) => academinYear.academic_id === data.academic_id);
    if (availableItems.length > 0) {
      const removedItems = availableItems.forEach(f =>{
        this.selectedList.splice(
          this.selectedList.findIndex((academinYear: any) => academinYear.academic_id === f.academic_id),
          1
        );
      }) 
    }
  }

  getResultReport(data:any){
    const report_group_item: result_report = {
      record_id:data.academic_id+'-'+data.department_id+'-'+data.class_id+'-'+data.division_id,
      academic_id: data.academic_id,
      academic_name: data.academic_name,
      department_id: data.department_id,
      department_name: data.department_name,
      class_id: data.class_id,
      class_name: data.class_name,
      division_id: data.division_id,
      division_name: data.division_name,
      result_date: this.commonForm.controls.result_date.value,
      result_criteria_group_id: this.commonForm.controls.result_criteria_group_id.value,
      exam_date: this.commonForm.controls.exam_date.value,
    };
    return report_group_item;
  }

  onRowEditInit(data:any){}
  onRowDelete(data:any,rowIndex:any){
    this.selectedList.splice(rowIndex,1)
    console.log(data);
    console.log(this.selectedFile);
    this.selectedFile.splice(this.selectedFile.findIndex(f =>{data.data.academic_id === f.data.academic_id && data.data.department_id === f.data.department_id && data.data.class_id === f.data.class_id && data.data.division_id === f.data.division_id }),1)
/* 
data: {academic_id: 1, department_id: 1, class_id: 3, division_id: 2}
expandedIcon: "pi pi-folder-open"
label: "B"
partialSelected:false 
*/
  }
  onRowEditSave(data:any){}

  submit() {
    var payload = {
      result_report_group_id: this.commonForm.controls.result_report_group_id.value,
      report_allocs: this.selectedList
    }
    this.apiService.postTypeRequest(`result_report_master_ops/${this.config.data.operation}`, payload).subscribe((result: any) => {
        if (result.result) {
          this.toster.success(result.message);
          this.ref.close(true);
        } else {
          this.toster.error(result.message);
          this.ref.close(false);
        }
      });
  }

  cancel() {
    this.ref.close(false);
  }

  clear() {
    this.selectedList = []
    this.selectedFile= []
  }
}
