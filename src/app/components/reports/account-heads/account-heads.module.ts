import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountHeadsRoutingModule } from './account-heads-routing.module';
import { AccountHeadsComponent } from './account-heads.component';
import { SharedModule } from '../../../shared/shared.module';
import { AccountHeadTransactionsComponent } from './account-head-transactions/account-head-transactions.component';


@NgModule({
  declarations: [
    AccountHeadsComponent,
    AccountHeadTransactionsComponent
  ],
  imports: [
    CommonModule,
    AccountHeadsRoutingModule,
    SharedModule
  ]
})
export class AccountHeadsModule { }
