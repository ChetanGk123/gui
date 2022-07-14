import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpencesRoutingModule } from './expences-routing.module';
import { ExpencesComponent } from './expences.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ExpencesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExpencesRoutingModule
  ]
})
export class ExpencesModule { }
