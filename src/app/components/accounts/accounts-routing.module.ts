import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTransferComponent } from './account-transfer/account-transfer.component';
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
      title: "Income Account",
      breadcrumb: "Add Income Account",
    },
  },
  {
    path: "addExpenseAccount",
    component: ExpenseAccountsComponent,
    data: {
      title: "Expense Account",
      breadcrumb: "Add Expense Account",
    },
  },
  {
    path: "accountTransfer",
    component: AccountTransferComponent,
    data: {
      title: "Account Transfer",
      breadcrumb: "Account Transfer",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
