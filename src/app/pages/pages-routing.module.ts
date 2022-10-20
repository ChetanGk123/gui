import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard" },
  { path: "dashboard", component: DefaultComponent },
  {
    path: "dashboards",
    loadChildren: () =>
      import("./dashboards/dashboards.module").then((m) => m.DashboardsModule),
  },
  {
    path: "student",
    loadChildren: () =>
      import("./student/student.module").then((m) => m.StudentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
