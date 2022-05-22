import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AdmissionLetterComponent } from './admission-letter/admission-letter.component';
import { PromoteStudentsComponent } from './promote-students/promote-students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ArchwizardModule, WizardComponent } from 'angular-archwizard'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { FeesComponent } from  './profile/fees/fees.component'
import { TransactionsComponent } from './profile/transactions/transactions.component';
import { DocumentsComponent } from './profile/documents/documents.component';
import { EditComponent } from './profile/fees/edit/edit.component';
import { AssignTcComponent } from './assign-tc/assign-tc.component';
import { TCComponent } from './tc/tc.component';
import { AssignedTcComponent } from './assigned-tc/assigned-tc.component';
import { TcDetailsComponent } from './assign-tc/tc-details/tc-details.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    StudentComponent,
    AllStudentsComponent,
    AdmissionLetterComponent,
    PromoteStudentsComponent,
    FeesComponent,
    ProfileComponent,
    TransactionsComponent,
    DocumentsComponent,
    EditComponent,
    AssignTcComponent,
    TCComponent,
    AssignedTcComponent,
    TcDetailsComponent,
  ],
  imports: [
    CommonModule,
    ArchwizardModule,
    NgxPrintModule,
    PrimengModule,
    AngularEditorModule,
    StudentRoutingModule,
    SharedModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [AllStudentsComponent],
  bootstrap: [AllStudentsComponent],
  providers: [ MessageService, ConfirmationService,WizardComponent,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
]
})
export class StudentModule { }
