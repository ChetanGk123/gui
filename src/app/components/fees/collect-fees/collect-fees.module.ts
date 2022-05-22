import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectFeesRoutingModule } from './collect-fees-routing.module';
import { CollectFeesComponent } from './collect-fees.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CollectFeesComponent
  ],
  imports: [
    CommonModule,
    CollectFeesRoutingModule,
    SharedModule
  ]
})
export class CollectFeesModule { }
