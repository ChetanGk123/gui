import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseAccountsComponent } from './accounts/expense-accounts/expense-accounts.component';
import { IncomeAccountsComponent } from './accounts/income-accounts/income-accounts.component';
import { AccountHeadsComponent } from './account-heads/account-heads.component';
import { DueFeesComponent } from './due-fees/due-fees.component';
import { ReportsComponent } from './reports.component';
import { StudentListComponent } from './studentList/studentList.component';

const routes: Routes = [
  { path: '', redirectTo:"incomeAccounts", pathMatch:"full" }, 
  {
    path: "incomeAccounts",
    component: IncomeAccountsComponent,
    data: {
      title: "Income Accounts",
      breadcrumb: "Income Accounts",
    },
  },
  {
    path: "expenseAccounts",
    component: ExpenseAccountsComponent,
    data: {
      title: "Expense Accounts",
      breadcrumb: "Expense Accounts",
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
  {
    path: "studentsList",
    component:StudentListComponent,
    data: {
      title: "Student List",
      breadcrumb: "Student List",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
