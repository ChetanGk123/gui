import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllReportsComponent } from "./all-reports/all-reports.component";
import { AssignMarksComponent } from "./assign-marks/assign-marks.component";
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultReportRoutingModule {}
