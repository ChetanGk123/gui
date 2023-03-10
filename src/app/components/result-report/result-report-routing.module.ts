import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllReportsComponent } from "./all-reports/all-reports.component";
import { AssignMarksComponent } from "./assign-marks/assign-marks.component";
import { AssignedMarksComponent } from "./assigned-marks/assigned-marks.component";
import { CriteriaGroupComponent } from "./criteria-group/criteria-group.component";
import { ResultReportComponent } from "./result-report.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "AllReports",
  },
  {
    path: "AllReports",
    component: AllReportsComponent,
    data: {
      title: "Result Reports",
      breadcrumb: "All",
    },
  },
  {
    path: "AssignMarks",
    component: AssignMarksComponent,
    data: {
      title: "Result Reports",
      breadcrumb: "Assign Marks",
    },
  },
  {
    path: "AssignedMarks",
    component: AssignedMarksComponent,
    data: {
      title: "Result Reports",
      breadcrumb: "Assigned Marks",
    },
  },
  {
    path: "CriteriaGroup",
    component: CriteriaGroupComponent,
    data: {
      title: "Criteria Group",
      breadcrumb: "Criteria Group",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultReportRoutingModule {}
