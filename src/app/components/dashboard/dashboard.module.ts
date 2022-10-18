import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { SuperAdminDashboardComponent } from "./super-admin-dashboard/super-admin-dashboard.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CountToModule } from "angular-count-to";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
//import { ChartistModule } from 'ng-chartist';
//import { NgChartsModule } from "ng2-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
  declarations: [DashboardComponent, AdminDashboardComponent, SuperAdminDashboardComponent],
  imports: [
    CommonModule,
    //ChartistModule,
    //NgChartsModule,
    CountToModule,
    DashboardRoutingModule,
    SharedModule,
    NgxDatatableModule,
  ],
})
export class DashboardModule {}
