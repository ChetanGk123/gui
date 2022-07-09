import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { AddAccountHeadComponent } from './add-account-head/add-account-head.component'
import { ExpenseAccountsComponent } from './expense-accounts/expense-accounts.component';
import { IncomeAccountsComponent } from './income-accounts/income-accounts.component';
const routes: Routes = [
  { path: '', redirectTo:'addIncomeAccount', pathMatch:'full'},
  {
    path: "addIncomeAccount",
    component: IncomeAccountsComponent,
    data: {
      title: "Add Income Account",
      breadcrumb: "Add Income Account",
    },
  },
  {
    path: "addExpenseAccount",
    component: ExpenseAccountsComponent,
    data: {
      title: "Add Expense Account",
      breadcrumb: "Add Expense Account",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
