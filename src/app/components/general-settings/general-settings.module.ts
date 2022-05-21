import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GeneralSettingsRoutingModule } from './general-settings-routing.module';
import { GeneralSettingsComponent } from './general-settings.component';
import { InstituteProfileComponent } from './institute-profile/institute-profile.component';
import { RulesNRegulationsComponent } from './rules-n-regulations/rules-n-regulations.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarksGradingComponent } from './marks-grading/marks-grading.component';


@NgModule({
  declarations: [
    GeneralSettingsComponent,
    InstituteProfileComponent,
    RulesNRegulationsComponent,
    MarksGradingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularEditorModule,
    GeneralSettingsRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    SharedModule,
    NgbModule,
  ]
})
export class GeneralSettingsModule { }
