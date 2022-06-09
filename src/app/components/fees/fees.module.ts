import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeesRoutingModule } from "./fees-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AcknowledgementComponent } from "./acknowledgement/acknowledgement.component";
import { FeePaymentComponent } from "./fee-payment/fee-payment.component";
import { FeeVoucherComponent } from "./fee-voucher/fee-voucher.component";
import { BalanceVoucherComponent } from "./balance-voucher/balance-voucher.component";
import { ArchwizardModule } from "angular-archwizard";
import { AssignFeesComponent } from "./assign-fees/assign-fees.component";
import { CollectFeesComponent } from "./collect-fees/collect-fees.component";
import { FeeComponentsComponent } from "./fee-components/fee-components.component";
import { NgxMaskModule } from "ngx-mask";
import { FeeGroupComponent } from "./fee-group/fee-group.component";

@NgModule({
  declarations: [
    AcknowledgementComponent,
    FeeGroupComponent,
    FeeComponentsComponent,
    AssignFeesComponent,
    CollectFeesComponent,
    FeePaymentComponent,
    FeeVoucherComponent,
    BalanceVoucherComponent,
  ],
  imports: [
    CommonModule,
    ArchwizardModule,
    SharedModule,
    FeesRoutingModule,
    NgxMaskModule.forRoot(),
  ],
})
export class FeesModule {}
