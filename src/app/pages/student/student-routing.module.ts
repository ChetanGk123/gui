import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStudentsComponent } from './all-students/all-students.component';
import { StudentResolver } from './student.resolver';

const routes: Routes = [
  {
    path:'allStudents',
    component:AllStudentsComponent,
    resolve:{
      data: StudentResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
