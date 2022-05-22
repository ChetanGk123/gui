import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoteStudentsRoutingModule } from './promote-students-routing.module';
import { PromoteStudentsComponent } from './promote-students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';


@NgModule({
  declarations: [
    PromoteStudentsComponent
  ],
  imports: [
    CommonModule,
    PromoteStudentsRoutingModule,
    SharedModule,
    ArchwizardModule,
  ]
})
export class PromoteStudentsModule { }
