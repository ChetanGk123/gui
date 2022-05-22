import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignTcRoutingModule } from './assign-tc-routing.module';
import { AssignTcComponent } from './assign-tc.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { TcDetailsComponent } from './tc-details/tc-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AssignTcComponent,
    TcDetailsComponent,
  ],
  imports: [
    CommonModule,
    AssignTcRoutingModule,
    SharedModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    TcDetailsComponent
  ]
})
export class AssignTcModule { }
