import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccountHeadComponent } from './add-account-head.component';

const routes: Routes = [{ path: '', component: AddAccountHeadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAccountHeadRoutingModule { }
