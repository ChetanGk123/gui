import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPwdRoutingModule } from './reset-pwd-routing.module';
import { ResetPwdComponent } from './reset-pwd.component';


@NgModule({
  declarations: [
    ResetPwdComponent
  ],
  imports: [
    CommonModule,
    ResetPwdRoutingModule
  ]
})
export class ResetPwdModule { }
