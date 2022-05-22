import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeComponentsRoutingModule } from './fee-components-routing.module';
import { FeeComponentsComponent } from './fee-components.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    FeeComponentsComponent
  ],
  imports: [
    CommonModule,
    FeeComponentsRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ]
})
export class FeeComponentsModule { }
