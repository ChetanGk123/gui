import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesRoutingModule } from './fees-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { ArchwizardModule } from 'angular-archwizard';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { NgxPrintModule } from 'ngx-print';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import { FeePaymentComponent } from './fee-payment/fee-payment.component';
import { FeeVoucherComponent } from './fee-voucher/fee-voucher.component';


@NgModule({
  declarations: [
    AcknowledgementComponent,
    FeePaymentComponent,
    FeeVoucherComponent
  ],
  imports: [
    CommonModule,
     SharedModule,
     FeesRoutingModule,
    // NgxPrintModule,
    // ArchwizardModule,
    // ReactiveFormsModule,
    // FormsModule,
    // PrimengModule,
    // TableModule,
    // NgbModule,
    // NgxDatatableModule,
    // NgxMaskModule.forRoot(),
  ]
})
export class FeesModule { }
