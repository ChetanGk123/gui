import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHeadsComponent } from './account-heads/account-heads.component';
import { AccountsComponent } from './accounts.component';
import { AddAccountHeadComponent } from './add-account-head/add-account-head.component';

const routes: Routes = [
  { path: '', component: AccountsComponent },
  {
    path: "accountHeads",
    component: AccountHeadsComponent,
    data: {
      title: "Account Heads",
      breadcrumb: "Account Heads",
    },
  },
  {
    path: "addAccountHeads",
    component: AddAccountHeadComponent,
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
