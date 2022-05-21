import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { AddAccountHeadComponent } from './add-account-head/add-account-head.component';
import { AccountHeadsComponent } from './account-heads/account-heads.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AccountsComponent,
    AddAccountHeadComponent,
    AccountHeadsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    NgbModule,
    NgxMaskModule,
    TableModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  providers:[ MessageService, ConfirmationService]
})
export class AccountsModule { }
