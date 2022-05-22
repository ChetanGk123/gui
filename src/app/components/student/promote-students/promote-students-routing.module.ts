import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoteStudentsComponent } from './promote-students.component';

const routes: Routes = [{ path: '', component: PromoteStudentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoteStudentsRoutingModule { }
