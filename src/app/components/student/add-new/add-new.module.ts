import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewRoutingModule } from './add-new-routing.module';
import { AddNewComponent } from './add-new.component';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddNewComponent
  ],
  imports: [
    CommonModule,
    ArchwizardModule,
    AddNewRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ]
})
export class AddNewModule { }
