import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHeadTransactionsComponent } from './account-head-transactions/account-head-transactions.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'accountHeadReport', component: AccountHeadTransactionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
