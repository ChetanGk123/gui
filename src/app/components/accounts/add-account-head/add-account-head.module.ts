import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAccountHeadRoutingModule } from './add-account-head-routing.module';
import { AddAccountHeadComponent } from './add-account-head.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddAccountHeadComponent
  ],
  imports: [
    CommonModule,
    AddAccountHeadRoutingModule,
    SharedModule
  ]
})
export class AddAccountHeadModule { }
