import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignFeesRoutingModule } from './assign-fees-routing.module';
import { AssignFeesComponent } from './assign-fees.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';


@NgModule({
  declarations: [
    AssignFeesComponent
  ],
  imports: [
    CommonModule,
    AssignFeesRoutingModule,
    ArchwizardModule,
    SharedModule
  ]
})
export class AssignFeesModule { }
