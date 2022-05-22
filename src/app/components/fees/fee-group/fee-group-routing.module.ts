import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeGroupComponent } from './fee-group.component';

const routes: Routes = [{ path: '', component: FeeGroupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeGroupRoutingModule { }
