import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeGroupRoutingModule } from './fee-group-routing.module';
import { FeeGroupComponent } from './fee-group.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContextMenuModule } from 'primeng/contextmenu';


@NgModule({
  declarations: [
    FeeGroupComponent
  ],
  imports: [
    CommonModule,
    FeeGroupRoutingModule,
    SharedModule,
    ContextMenuModule
  ]
})
export class FeeGroupModule { }
