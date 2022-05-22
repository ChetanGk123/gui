import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectFeesComponent } from './collect-fees.component';

const routes: Routes = [{ path: '', component: CollectFeesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectFeesRoutingModule { }
