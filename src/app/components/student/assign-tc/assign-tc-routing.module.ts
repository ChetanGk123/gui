import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignTcComponent } from './assign-tc.component';

const routes: Routes = [{ path: '', component: AssignTcComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignTcRoutingModule { }
