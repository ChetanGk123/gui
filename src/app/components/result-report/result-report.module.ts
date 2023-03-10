import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ResultReportRoutingModule } from "./result-report-routing.module";
import { ResultReportComponent } from "./result-report.component";
import { AllReportsComponent } from "./all-reports/all-reports.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from "primeng/dynamicdialog";
import { MapReportComponent } from "./all-reports/map-report/map-report.component";
import { ConfigReportComponent } from "./all-reports/config-report/config-report.component";
import { AssignMarksComponent } from "./assign-marks/assign-marks.component";
import { ArchwizardModule, WizardComponent } from "angular-archwizard";
import { CriteriaGroupComponent } from './criteria-group/criteria-group.component';
import { ManageCriteriaComponent } from './criteria-group/manage-criteria/manage-criteria.component';
import { ConfigCriteriaComponent } from './criteria-group/config-criteria/config-criteria.component';
import { UpdateReportComponent } from './all-reports/update-report/update-report.component';
import { AssignedMarksComponent } from './assigned-marks/assigned-marks.component';
import { MarksReportComponent } from './assigned-marks/marks-report/marks-report.component';

@NgModule({
  declarations: [ResultReportComponent, AllReportsComponent, MapReportComponent, ConfigReportComponent, AssignMarksComponent, CriteriaGroupComponent, ManageCriteriaComponent, ConfigCriteriaComponent, UpdateReportComponent, AssignedMarksComponent, MarksReportComponent],
  imports: [CommonModule, ResultReportRoutingModule, ArchwizardModule, SharedModule, NgxMaskModule.forRoot()],
  providers: [DynamicDialogRef, DynamicDialogConfig, DialogService,WizardComponent],
})
export class ResultReportModule {}
