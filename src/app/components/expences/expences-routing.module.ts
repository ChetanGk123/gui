import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpencesComponent } from './expences.component';

const routes: Routes = [{ path: '', component: ExpencesComponent,data: {
  title: "Expences",
  breadcrumb: "View Expences",
}, }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpencesRoutingModule { }
