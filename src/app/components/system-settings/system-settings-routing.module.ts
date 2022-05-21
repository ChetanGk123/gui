import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterModuleComponent } from './register-module/register-module.component';
import { RegisterPagesComponent } from './register-pages/register-pages.component';
import { RegisterSubPagesComponent } from './register-sub-pages/register-sub-pages.component';
import { RoleComponent } from './role/role.component'
const routes: Routes = [
  { path: '', redirectTo:'role',pathMatch:'full' },
  { path: 'role', component: RoleComponent,
  data: {
    title: "Add Role",
    breadcrumb: "Add Role",
  }, },
  { path: 'registerPage', component: RegisterPagesComponent,
  data: {
    title: "Register Pages",
    breadcrumb: "Register Pages",
  }, },
  { path: 'registerSubPage', component: RegisterSubPagesComponent,
  data: {
    title: "Register Sub Pages",
    breadcrumb: "Register Sub Pages",
  }, },
  { path: 'registerModule', component: RegisterModuleComponent,
  data: {
    title: "Register Module",
    breadcrumb: "Register Module",
  }, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingsRoutingModule { }
