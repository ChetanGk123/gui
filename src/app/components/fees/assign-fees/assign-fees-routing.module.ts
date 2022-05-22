import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignFeesComponent } from './assign-fees.component';

const routes: Routes = [{ path: '', component: AssignFeesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignFeesRoutingModule { }
