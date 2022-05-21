import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { TableModule } from 'primeng/table'

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
