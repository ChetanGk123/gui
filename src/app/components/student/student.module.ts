import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AdmissionLetterComponent } from './admission-letter/admission-letter.component';
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
import { TCComponent } from './tc/tc.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CameraComponent } from 'src/app/shared/components/camera/camera.component';


@NgModule({
  declarations: [
    StudentComponent,
    AdmissionLetterComponent,
    FeesComponent,
    ProfileComponent,
    TransactionsComponent,
    DocumentsComponent,
    EditComponent,
    TCComponent,
    CameraComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    AngularEditorModule,
    StudentRoutingModule,
    SharedModule,
    AccordionModule.forRoot(),
    NgbModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [ MessageService, ConfirmationService,WizardComponent,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
]
})
export class StudentModule { }
