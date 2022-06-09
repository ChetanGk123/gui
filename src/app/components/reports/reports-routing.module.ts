import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHeadsComponent } from './account-heads/account-heads.component';
import { DueFeesComponent } from './due-fees/due-fees.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent }, 
  {
    path: "accountHeads",
    component: AccountHeadsComponent,
    data: {
      title: "Account Heads",
      breadcrumb: "Account Heads",
    },
  },
  {
    path: "dueFees",
    component:DueFeesComponent,
    data: {
      title: "Due Fees",
      breadcrumb: "Due Fees",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
