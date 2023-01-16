import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SubjectsRoutingModule } from "./subjects-routing.module";
import { SubjectsComponent } from "./subjects.component";
import { AddSubjectComponent } from "./add-subject/add-subject.component";
import { ArchwizardModule } from "angular-archwizard";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { MapSubjectsComponent } from './map-subjects/map-subjects.component';

@NgModule({
  declarations: [SubjectsComponent, AddSubjectComponent, MapSubjectsComponent],
  imports: [CommonModule, SubjectsRoutingModule, ArchwizardModule, SharedModule, NgxMaskModule.forRoot()],
})
export class SubjectsModule {}
