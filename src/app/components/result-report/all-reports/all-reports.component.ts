import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
import { ConfigReportComponent } from "./config-report/config-report.component";
import { MapReportComponent } from "./map-report/map-report.component";
import { UpdateReportComponent } from "./update-report/update-report.component";

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
  resultGroupList: any[] = [];
  criteriaGroupList: any[] = [];
  academic_attributes_tree;
  constructor(public apiService: ApiService, public spinner: SpinnerService, public toster: ToastrService, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.dataFetch = true;
    this.apiService.getTypeRequest("new_table_data/RESULT_REPORT").subscribe((result: any) => {
      this.reportList = result.data;
      this.dataFetch = false;
    });
    this.apiService.getTypeRequest("new_table_data/RESULT_REPORT_GROUP").subscribe((result: any) => {
      this.resultGroupList = result.data;
    });
    this.apiService.getTypeRequest("new_table_data/RESULT_CRITERIA_GROUP").subscribe((result: any) => {
      this.criteriaGroupList = result.data;
    });
    (this.dataFetch = true),
      this.apiService
        .getTypeRequest("academic_attributes_tree")
        .toPromise()
        .then((result: any) => {
          this.dataFetch = false;
          this.academic_attributes_tree = result?.data;
        });
  }

  addReport() {
    const ref = this.dialogService.open(MapReportComponent, {
      data: {
        operation: "insert",
        criteriaGroupList:this.criteriaGroupList,
        resultGroupList: this.resultGroupList,
        academic_attributes_tree: this.academic_attributes_tree,
      },
      header: `Map New Report`,
      styleClass: "w-10 sm:w-10 md:w-10 lg:w-9",
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.ngOnInit();
        // this.configReport(result.data[0])
      }
    });
  }

  updateReport(data: any) {
    const ref = this.dialogService.open(UpdateReportComponent, {
      data: {
        data: data,
        operation: "update",
        criteriaGroupList:this.criteriaGroupList,
        resultGroupList: this.resultGroupList,
        // academic_attributes_tree: this.academic_attributes_tree,
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
        academic_attributes_tree: this.academic_attributes_tree,
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

  configReport(product: any) {
    // console.log(product);
    
    const ref = this.dialogService.open(ConfigReportComponent, {
      dismissableMask: true,
      data: {
        data: product,
        academic_attributes_tree: this.academic_attributes_tree,
      },
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
