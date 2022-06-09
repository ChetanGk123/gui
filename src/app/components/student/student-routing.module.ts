import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddNewComponent } from "./add-new/add-new.component";
import { AdmissionLetterComponent } from "./admission-letter/admission-letter.component";
import { AllStudentsComponent } from "./all-students/all-students.component";
import { AssignTcComponent } from "./assign-tc/assign-tc.component";
import { AssignedTcComponent } from "./assigned-tc/assigned-tc.component";
import { ProfileComponent } from "./profile/profile.component";
import { PromoteStudentsComponent } from "./promote-students/promote-students.component";
import { StudentComponent } from "./student.component";

const routes: Routes = [
  { path: "", redirectTo:"allStudents" },
  {
    path: "allStudents",
    component:AllStudentsComponent,
    data: {
      title: "All Students",
      breadcrumb: "All Students",
    },
  },
  {
    path: "addNew",
    component:AddNewComponent,
    data: {
      title: "Add Student",
      breadcrumb: "Add Student",
    },
  },
  {
    path: "admissionLetter",
    component: AdmissionLetterComponent,
    data: {
      title: "Admission Letter",
      breadcrumb: "Admission Letter",
    },
  },
  {
    path: "studentInfo", component: ProfileComponent, 
    data: {
      title: "Student Info",
      breadcrumb: "Student Info",
    },
  },
  {
    path: "promote",
    component:PromoteStudentsComponent,
    data: {
      title: "Promote Student",
      breadcrumb: "Promote Student",
    },
  },
  {
    path: "assignTc",
    component:AssignTcComponent,
    data: {
      title: "Assign TC",
      breadcrumb: "Assign TC",
    },
  },
  {
    path: "assignedTc",
    component:AssignedTcComponent,
    data: {
      title: "Assigned TC",
      breadcrumb: "Assigned TC",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
