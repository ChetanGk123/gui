import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeComponentsComponent } from './fee-components.component';

const routes: Routes = [{ path: '', component: FeeComponentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeComponentsRoutingModule { }
