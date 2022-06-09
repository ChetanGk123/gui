import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscRoutingModule } from './misc-routing.module';
import { MiscComponent } from './misc.component';
import { CasteComponent } from './caste/caste.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocComponent } from './doc/doc.component';
import { BloodGroupComponent } from './blood-group/blood-group.component';
import { GenderComponent } from './gender/gender.component';
import { AddNewComponent } from './add-new/add-new.component';
import { ClassComponent } from './class/class.component';
import { DivisionComponent } from './division/division.component';
import { DepartmentComponent } from './department/department.component';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { ReligionComponent } from './religion/religion.component';
import { CategoryComponent } from './category/category.component';
import { PrimengModule } from 'src/app/shared/primeng.module';


@NgModule({
  declarations: [
    MiscComponent,
    CasteComponent,
    DocComponent,
    BloodGroupComponent,
    GenderComponent,
    AddNewComponent,
    ClassComponent,
    DivisionComponent,
    DepartmentComponent,
    AcademicYearComponent,
    ReligionComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MiscRoutingModule
  ]
})
export class MiscModule { }
