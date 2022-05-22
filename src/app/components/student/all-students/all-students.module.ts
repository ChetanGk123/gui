import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStudentsRoutingModule } from './all-students-routing.module';
import { AllStudentsComponent } from './all-students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllStudentsComponent
  ],
  imports: [
    CommonModule,
    AllStudentsRoutingModule,
    SharedModule,
  ]
})
export class AllStudentsModule { }
