import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedTcComponent } from './assigned-tc.component'; 

const routes: Routes = [{ path: '', component: AssignedTcComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedTcRoutingModule { }
