import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    TeachersComponent,
    AddNewComponent,
    AllTeachersComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
