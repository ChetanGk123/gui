import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SubjectsRoutingModule } from "./subjects-routing.module";
import { SubjectsComponent } from "./subjects.component";
import { AddSubjectComponent } from "./add-subject/add-subject.component";
import { ArchwizardModule } from "angular-archwizard";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { MapSubjectsComponent } from './map-subjects/map-subjects.component';
import { MapNewSubjectComponent } from './map-subjects/map-new-subject/map-new-subject.component';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from "primeng/dynamicdialog";
import { MapTeachersComponent } from './map-subjects/map-teachers/map-teachers.component';

@NgModule({
  declarations: [SubjectsComponent, AddSubjectComponent, MapSubjectsComponent, MapNewSubjectComponent, MapTeachersComponent],
  imports: [CommonModule, SubjectsRoutingModule, ArchwizardModule, SharedModule, NgxMaskModule.forRoot()],
  providers: [DynamicDialogRef, DynamicDialogConfig, DialogService],
})
export class SubjectsModule {}
