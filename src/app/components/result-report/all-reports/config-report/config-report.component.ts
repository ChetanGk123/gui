import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ApiService } from "src/app/shared/services/auth/api.service";

@Component({
  selector: "app-config-report",
  templateUrl: "./config-report.component.html",
  styleUrls: ["./config-report.component.scss"],
})
export class ConfigReportComponent implements OnInit {
  constructor(public datepipe: DatePipe, public config: DynamicDialogConfig, public apiService: ApiService, public toster: ToastrService, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    console.log(this.config.data);
    var data = {
      report_id: 4,
      academic_id: 1,
      department_id: 1,
      class_id: 2,
    };
    this.apiService
      .postTypeRequest("subject_allocation_data", data)
      .toPromise()
      .then((result: any) => {
        console.log(result);
      });
  }
}
