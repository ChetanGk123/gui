import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo:"feeGroup" },
  {
    path: "feeGroup",
    loadChildren: () => import('./fee-group/fee-group.module').then(m => m.FeeGroupModule),
    data: {
      title: "Fee Groups",
      breadcrumb: "Fee Groups",
    },
  },
  {
    path: "feeComponents",
    loadChildren: () => import('./fee-components/fee-components.module').then(m => m.FeeComponentsModule),
    data: {
      title: "Fee Components",
      breadcrumb: "Fee Components",
    },
  },
  {
    path: "assignFees",
    loadChildren: () => import('./assign-fees/assign-fees.module').then(m => m.AssignFeesModule),
    data: {
      title: "Assign Fees",
      breadcrumb: "Assign Fees",
    },
  },

  {
    path: "collectFees",
    loadChildren: () => import('./collect-fees/collect-fees.module').then(m => m.CollectFeesModule),
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
