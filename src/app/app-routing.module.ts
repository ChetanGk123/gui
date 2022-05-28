import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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
    path: "demoAuth",
    loadChildren: () =>
      import("./components/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "institute",
    loadChildren: () =>
      import("./components/institute/institute.module").then(
        (m) => m.InstituteModule
      ),
  },
  {
    path: "accounts",
    loadChildren: () =>
      import("./components/accounts/accounts.module").then(
        (m) => m.AccountsModule
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./components/profile/profile.module").then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: "**",
    redirectTo: "/error/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
