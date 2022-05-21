import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralSettingsComponent } from './general-settings.component';
import { InstituteProfileComponent } from './institute-profile/institute-profile.component';
import { MarksGradingComponent } from './marks-grading/marks-grading.component';
import { RulesNRegulationsComponent } from './rules-n-regulations/rules-n-regulations.component';

const routes: Routes = [
  { path: 'rulesNRegulations', component: RulesNRegulationsComponent },
  { path: 'instituteProfile', component: InstituteProfileComponent },
  { path: 'marksGrading', component: MarksGradingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralSettingsRoutingModule { }
