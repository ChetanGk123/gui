import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DueFeesRoutingModule } from './due-fees-routing.module';
import { DueFeesComponent } from './due-fees.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DueFeesReportComponent } from './due-fees-report/due-fees-report.component';


@NgModule({
  declarations: [
    DueFeesComponent,
    DueFeesReportComponent
  ],
  imports: [
    CommonModule,
    DueFeesRoutingModule,
    SharedModule
  ]
})
export class DueFeesModule { }
