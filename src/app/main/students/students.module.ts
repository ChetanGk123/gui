import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { StudentsComponent } from "./students.component";
import { AllStudentsComponent } from "./all-students/all-students.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "AllStudents" },
  { path: "AllStudents", component: AllStudentsComponent },
];

@NgModule({
  declarations: [StudentsComponent, AllStudentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
  ],
})
export class StudentsModule {}
