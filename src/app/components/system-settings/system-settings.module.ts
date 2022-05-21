import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingsRoutingModule } from './system-settings-routing.module';
import { RoleComponent } from './role/role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeesRoutingModule } from '../fees/fees-routing.module';
import { RegisterPagesComponent } from './register-pages/register-pages.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RegisterModuleComponent } from './register-module/register-module.component';
import { RegisterSubPagesComponent } from './register-sub-pages/register-sub-pages.component';
import { OperationsComponent } from './operations/operations.component';
import { TableModule } from 'primeng/table';
import { PrimengModule } from 'src/app/shared/primeng.module';


@NgModule({
  declarations: [
  RoleComponent,
  RegisterPagesComponent,
  RegisterModuleComponent,
  RegisterSubPagesComponent,
  OperationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    PrimengModule,
    NgxDatatableModule,
    FeesRoutingModule,
    SharedModule,
    TableModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot(),
    SystemSettingsRoutingModule
  ],
  exports:[RoleComponent,]
})
export class SystemSettingsModule { }
