import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddSubjectComponent } from "./add-subject/add-subject.component";
import { MapSubjectsComponent } from "./map-subjects/map-subjects.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "AllSubjects" },
  {
    path: "AllSubjects",
    component: AddSubjectComponent,
    data: {
      title: "Subjects",
      breadcrumb: "All",
    },
  },
  {
    path: "MapSubjects",
    component: MapSubjectsComponent,
    data: {
      title: "Subjects",
      breadcrumb: "Map",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectsRoutingModule {}
