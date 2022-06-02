import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  {
    path: "accountHeads",
    loadChildren: () => import('./account-heads/account-heads.module').then(m => m.AccountHeadsModule),
    data: {
      title: "Account Heads",
      breadcrumb: "Account Heads",
    },
  },
  {
    path: "dueFees",
    loadChildren: () => import('../reports/due-fees/due-fees.module').then(m => m.DueFeesModule),
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
