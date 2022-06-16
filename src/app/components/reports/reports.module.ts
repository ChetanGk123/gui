import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { AccountHeadsComponent } from './account-heads/account-heads.component'
import { ConfirmationService } from 'primeng/api';
import { AccountHeadTransactionsComponent } from './account-heads/account-head-transactions/account-head-transactions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DueFeesReportComponent } from './due-fees/due-fees-report/due-fees-report.component';
import { DueFeesComponent } from './due-fees/due-fees.component';
import { StudentListComponent } from './studentList/studentList.component';
import { StudentListReportComponent } from './studentList/student-list-report/student-list-report.component';


@NgModule({
  declarations: [
    ReportsComponent,
    AccountHeadsComponent,
    AccountHeadTransactionsComponent,
    DueFeesComponent,
    DueFeesReportComponent,
    StudentListComponent,
    StudentListReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
  ],
  providers:[ConfirmationService]
})
export class ReportsModule { }
