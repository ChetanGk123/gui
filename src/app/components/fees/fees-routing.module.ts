import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignFeesComponent } from './assign-fees/assign-fees.component';
import { CollectFeesComponent } from './collect-fees/collect-fees.component';
import { FeeComponentsComponent } from './fee-components/fee-components.component';
import { FeeGroupComponent } from './fee-group/fee-group.component';

const routes: Routes = [
  { path: "", redirectTo:"feeGroup" },
  {
    path: "feeGroup",
    component:FeeGroupComponent,
    data: {
      title: "Fee Groups",
      breadcrumb: "Fee Groups",
    },
  },
  {
    path: "feeComponents",
    component:FeeComponentsComponent,
    data: {
      title: "Fee Components",
      breadcrumb: "Fee Components",
    },
  },
  {
    path: "assignFees",
    component:AssignFeesComponent,
    data: {
      title: "Assign Fees",
      breadcrumb: "Assign Fees",
    },
  },

  {
    path: "collectFees",
    component: CollectFeesComponent,
    data: {
      title: "Collect Fees",
      breadcrumb: "Collect Fees",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
