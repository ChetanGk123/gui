import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewComponent } from './add-new/add-new.component';
import { AllInstitutesComponent } from './all-institutes/all-institutes.component';
import { InstituteProfileComponent } from './institute-profile/institute-profile.component';
import { InstituteComponent } from './institute.component';

const routes: Routes = [
  { 
    path: '', 
    component: InstituteComponent 
  },
  { path: "", redirectTo:"allInstitutes" },
  {
    path: "allInstitutes",
    component: AllInstitutesComponent,
    data: {
      title: "All Institutes",
      breadcrumb: "All Institutes",
    },
  },
  {
    path: "addNew",
    component: AddNewComponent,
    data: {
      title: "New Institute",
      breadcrumb: "New Institute",
    },
  },
  {
    path: "instituteInfo",
    component: InstituteProfileComponent,
    data: {
      title: "Institute Info",
      breadcrumb: "Institute Info",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteRoutingModule { }
