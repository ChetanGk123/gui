import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: TeachersComponent },
  { 
    path: 'allTeachers', 
    component: AllTeachersComponent,
    data: {
      title: "All Teachers",
      breadcrumb: "All Teachers",
    },  
  },
  {
    path: "addNew",
    component: AddNewComponent,
    data: {
      title: "Add Teacher",
      breadcrumb: "Add New Teacher",
    },
  },
  {
    path: "teacherInfo",
    component: ProfileComponent,
    data: {
      title: "Teacher Info",
      breadcrumb: "Teacher Info",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
