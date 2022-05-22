import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';

const routes: Routes = [
  { path: '', component: AccountsComponent },
  {
    path: "accountHeads",
    loadChildren: () => import('./account-heads/account-heads.module').then(m => m.AccountHeadsModule),
    data: {
      title: "Account Heads",
      breadcrumb: "Account Heads",
    },
  },
  {
    path: "addAccountHeads",
    loadChildren: () => import('./add-account-head/add-account-head.module').then(m => m.AddAccountHeadModule),
    data: {
      title: "Add Account Heads",
      breadcrumb: "Add Account Heads",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
