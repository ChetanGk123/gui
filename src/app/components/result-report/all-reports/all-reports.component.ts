import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { ConfigReportComponent } from "./config-report/config-report.component";
import { MapReportComponent } from "./map-report/map-report.component";

@Component({
  selector: "app-all-reports",
  templateUrl: "./all-reports.component.html",
  styleUrls: ["./all-reports.component.scss"],
})
export class AllReportsComponent implements OnInit {
  dataFetch: boolean = false;
  reportList: any[] = [];
  academinYearList: any[] = [];
  departmentList: any[] = [];
  classList: any[] = [];
  divisionList: any[] = [];
  constructor(public apiService: ApiService, public spinner: SpinnerService, public toster: ToastrService, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.dataFetch = true;
    this.apiService.getTypeRequest("new_table_data/RESULT_REPORT").subscribe((result: any) => {
      this.reportList = result.data;
      this.dataFetch = false;
      /* [
        {
            "report_id": 1,
            "name": "Report Name1",
            "academic_id": 3,
            "academic_year": "2020-21",
            "department_id": 2,
            "department": "Kannada",
            "class_id": 1,
            "class": "UKG",
            "div_id": 1,
            "division": "A",
            "result_date": "20-12-2022"
        },
        {
            "report_id": 2,
            "name": "Report Name2",
            "academic_id": 1,
            "academic_year": "2022-23",
            "department_id": 1,
            "department": "ENGLISH",
            "class_id": 1,
            "class": "UKG",
            "div_id": 1,
            "division": "A",
            "result_date": "20-12-2022"
        }
    ] */
    });
    (this.dataFetch = true),
      this.apiService
        .getTypeRequest("admission_form_data")
        .toPromise()
        .then((result: any) => {
          this.dataFetch = false;
          this.academinYearList = result.data["academic_year"];
          this.departmentList = result.data["department"];
          this.classList = result.data["class"];
          this.divisionList = result.data["division"];

          /* this.academinYearList = result.data["academic_year"];
        this.bloodGroupList = result.data["blood_group"];
        this.genderList = result.data["gender"];
        this.categoryList = result.data["category"];
        this.casteList = result.data["caste"];
        this.religionList = result.data["religion"];
        this.departmentList = result.data["department"];
        this.classList = result.data["class"];
        this.divisionList = result.data["division"]; */
        });
  }

  addReport() {
    const ref = this.dialogService.open(MapReportComponent, {
      data: {
        operation: "insert",
        academinYearList: this.academinYearList,
        departmentList: this.departmentList,
        classList: this.classList,
        divisionList: this.divisionList,
      },
      header: `Map New Report`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-6",
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  updateReport(data: any) {
    const ref = this.dialogService.open(MapReportComponent, {
      data: {
        data: data,
        operation: "update",
        academinYearList: this.academinYearList,
        departmentList: this.departmentList,
        classList: this.classList,
        divisionList: this.divisionList,
      },
      header: `Update Report`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-6",
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  deleteReport(data: any) {
    const ref = this.dialogService.open(MapReportComponent, {
      data: {
        data: data,
        operation: "delete",
        academinYearList: this.academinYearList,
        departmentList: this.departmentList,
        classList: this.classList,
        divisionList: this.divisionList,
      },
      header: `Delete Report`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-6",
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  configReport(product:any){
    const ref = this.dialogService.open(ConfigReportComponent, {
      data: product,
      header: `Configure Report`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-6",
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
}
