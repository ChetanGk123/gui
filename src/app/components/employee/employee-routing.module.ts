import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { AddNewComponent } from './add-new/add-new.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: "", redirectTo:"allEmployees" },
  {
    path: "allEmployees",
    component:AllEmployeesComponent,
    data: {
      title: "All Employees",
      breadcrumb: "All Employees",
    },
  },
  {
    path: "employeeInfo",
    component:ProfileComponent,
    data: {
      title: "Employee Info",
      breadcrumb: "Employee Info",
    },
  },
  {
    path: "addNew",
    component:AddNewComponent,
    data: {
      title: "New Employees",
      breadcrumb: "New Employees",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
