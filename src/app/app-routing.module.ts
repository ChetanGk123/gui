import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./components/authentication/login/login.component";
import { UnlockUserComponent } from "./components/authentication/unlock-user/unlock-user.component";
import { ContentLayoutComponent } from "./shared/components/layout/content-layout/content-layout.component";
import { content } from "./shared/routes/content-routes";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: ContentLayoutComponent,
    children: content,
  },
  {
    path: "auth/login",
    component: LoginComponent,
  },
  {
    path: "auth/unlock",
    component: UnlockUserComponent,
  },
  {
    path: "**",
    redirectTo: "/error/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { 
      preloadingStrategy: PreloadAllModules ,
      relativeLinkResolution: "legacy"
    },)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
