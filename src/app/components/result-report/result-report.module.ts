import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ResultReportRoutingModule } from "./result-report-routing.module";
import { ResultReportComponent } from "./result-report.component";
import { AllReportsComponent } from "./all-reports/all-reports.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from "primeng/dynamicdialog";
import { MapReportComponent } from "./all-reports/map-report/map-report.component";
import { ConfigReportComponent } from './all-reports/config-report/config-report.component';

@NgModule({
  declarations: [ResultReportComponent, AllReportsComponent, MapReportComponent, ConfigReportComponent],
  imports: [CommonModule, ResultReportRoutingModule, SharedModule, NgxMaskModule.forRoot()],
  providers: [DynamicDialogRef, DynamicDialogConfig, DialogService],
})
export class ResultReportModule {}
