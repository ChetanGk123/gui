import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { AccountHeadTransactionsComponent } from './account-head-transactions/account-head-transactions.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    ReportsComponent,
    AccountHeadTransactionsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ],
  providers:[ConfirmationService]
})
export class ReportsModule { }
