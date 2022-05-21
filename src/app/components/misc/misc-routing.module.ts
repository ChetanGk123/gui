import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MiscComponent } from "./misc.component";
import { AddNewComponent } from "./add-new/add-new.component";
const routes: Routes = [
  { path: "", component: MiscComponent },
  {
    path: "addNew",
    component: AddNewComponent,
    data: {
      title: "Misc",
      breadcrumb: "Add New",
    },
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscRoutingModule {}
