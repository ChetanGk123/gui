import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituteRoutingModule } from './institute-routing.module';
import { InstituteComponent } from './institute.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AllInstitutesComponent } from './all-institutes/all-institutes.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InstituteProfileComponent } from './institute-profile/institute-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { SystemSettingsModule } from '../system-settings/system-settings.module';
import { RolesComponent } from './roles/roles.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { NgxMaskModule } from 'ngx-mask';
import { PrimengModule } from 'src/app/shared/primeng.module';


@NgModule({
  declarations: [
    InstituteComponent,
    AddNewComponent,
    AllInstitutesComponent,
    InstituteProfileComponent,
    UsersComponent,
    NewUserComponent,
    RolesComponent,
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    InstituteRoutingModule,
    SystemSettingsModule,
    NgxDatatableModule,
    ReactiveFormsModule, 
    FormsModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    TableModule,
    NgbModule
  ]
})
export class InstituteModule { }
