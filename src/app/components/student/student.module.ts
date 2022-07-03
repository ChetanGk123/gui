import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ArchwizardModule, WizardComponent } from "angular-archwizard";
import { NgxMaskModule } from "ngx-mask";
import { SharedModule } from "src/app/shared/shared.module";
import { AddNewComponent } from "./add-new/add-new.component";
import { DocumentsComponent } from "./profile/documents/documents.component";
import { ProfileComponent } from "./profile/profile.component";
import { AllStudentsComponent } from "./all-students/all-students.component";
import { StudentRoutingModule } from './student-routing.module' 

import { AssignTcComponent } from './assign-tc/assign-tc.component'
import { TcDetailsComponent } from './assign-tc/tc-details/tc-details.component'
import { AssignedTcComponent } from './assigned-tc/assigned-tc.component'
import { PromoteStudentsComponent } from './promote-students/promote-students.component'
import { AdmissionLetterComponent } from './admission-letter/admission-letter.component'
import { TransactionsComponent } from './profile/transactions/transactions.component'
import { FeesComponent } from './profile/fees/fees.component'
import { EditComponent } from './profile/fees/edit/edit.component'
import { TCComponent } from './tc/tc.component'


@NgModule({
  declarations: [
    AddNewComponent,
    AllStudentsComponent,
    AssignTcComponent,
    TcDetailsComponent,
    AssignedTcComponent,
    PromoteStudentsComponent,
    AdmissionLetterComponent,
    ProfileComponent,
    FeesComponent,
    TransactionsComponent,
    DocumentsComponent,
    EditComponent,
    TCComponent,
  ],
  imports: [
    CommonModule,
    AngularEditorModule,
    StudentRoutingModule,
    SharedModule,
    ArchwizardModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot(),
    
  ],
  providers: [WizardComponent,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
]
})
export class StudentModule { }
