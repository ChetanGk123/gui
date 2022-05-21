import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { DashboardComponent } from './dashboard.component'
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component'
const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate:[AdminGuard],
    data: {
      title: "Dashboard",
      breadcrumb: "Admin",
    },
  }, 
  {
    path: "superAdmin",
    component: SuperAdminDashboardComponent,
    canActivate:[AdminGuard],
    data: {
      title: "Dashboard",
      breadcrumb: "Super Admin",
      roles:['superAdmin']
    },
  },
  {
    path: "admin",
    component: AdminDashboardComponent,
    canActivate:[AdminGuard],
    data: {
      title: "Dashboard",
      breadcrumb: "Admin",
      roles:['admin']
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
