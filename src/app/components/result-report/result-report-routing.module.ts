import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllReportsComponent } from "./all-reports/all-reports.component";
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultReportRoutingModule {}
