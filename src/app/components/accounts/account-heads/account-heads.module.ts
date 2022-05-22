import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountHeadsRoutingModule } from './account-heads-routing.module';
import { AccountHeadsComponent } from './account-heads.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccountHeadsComponent
  ],
  imports: [
    CommonModule,
    AccountHeadsRoutingModule,
    SharedModule
  ]
})
export class AccountHeadsModule { }
