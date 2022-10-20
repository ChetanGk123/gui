import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StudentRoutingModule } from "./student-routing.module";
import { StudentComponent } from "./student.component";

import { DynamicDialogModule } from "primeng/dynamicdialog";
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';

@NgModule({
  declarations: [StudentComponent, AddNewStudentComponent],
  imports: [CommonModule, DynamicDialogModule, StudentRoutingModule],
})
export class StudentModule {}
