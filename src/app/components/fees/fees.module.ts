import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesRoutingModule } from './fees-routing.module';
import { FeeGroupComponent } from './fee-group/fee-group.component';
import { FeeComponentsComponent } from './fee-components/fee-components.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { BulkAssignComponent } from './bulk-assign/bulk-assign.component';
import { ArchwizardModule } from 'angular-archwizard';
import { AssignFeesComponent } from './assign-fees/assign-fees.component';
import { DueFeesComponent } from './due-fees/due-fees.component';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import { NgxPrintModule } from 'ngx-print';
import { CollectFeesComponent } from './collect-fees/collect-fees.component';
import { FeePaymentComponent } from './fee-payment/fee-payment.component';
import { FeeVoucherComponent } from './fee-voucher/fee-voucher.component';


@NgModule({
  declarations: [
    FeeGroupComponent,
    FeeComponentsComponent,
    BulkAssignComponent,
    AssignFeesComponent,
    DueFeesComponent,
    AcknowledgementComponent,
    CollectFeesComponent,
    FeePaymentComponent,
    FeeVoucherComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxPrintModule,
    ArchwizardModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    TableModule,
    NgbModule,
    NgxDatatableModule,
    FeesRoutingModule,
    NgxMaskModule.forRoot(),
  ]
})
export class FeesModule { }
