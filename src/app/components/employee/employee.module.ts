import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AddNewComponent } from './add-new/add-new.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule, WizardComponent } from 'angular-archwizard';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CameraComponent } from 'src/app/shared/components/camera/camera.component';
import { DocumentsComponent } from './profile/documents/documents.component';


@NgModule({
  declarations: [
    AddNewComponent,
    AllEmployeesComponent,
    ProfileComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    ArchwizardModule,
    AccordionModule.forRoot(),
    NgxDatatableModule,
    NgxMaskModule.forRoot(),
    EmployeeRoutingModule
  ],
  providers: [ MessageService, ConfirmationService,WizardComponent,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class EmployeeModule { }
