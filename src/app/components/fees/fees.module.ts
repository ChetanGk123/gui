import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesRoutingModule } from './fees-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
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
  ]
})
export class FeesModule { }
