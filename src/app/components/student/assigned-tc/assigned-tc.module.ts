import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedTcRoutingModule } from './assigned-tc-routing.module';
import { AssignedTcComponent } from './assigned-tc.component';
import { SharedModule } from '../../../shared/shared.module'
import { PrimengModule } from '../../../shared/primeng.module';
import { TcDetailsComponent } from '../assign-tc/tc-details/tc-details.component';
import { AssignTcModule } from '../assign-tc/assign-tc.module';

@NgModule({
  declarations: [
    AssignedTcComponent,
  ],
  imports: [
    CommonModule,
    AssignedTcRoutingModule,
    SharedModule,
    AssignTcModule
  ]
})
export class AssignedTcModule { }
