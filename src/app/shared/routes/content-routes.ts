import { Routes } from "@angular/router";
import { AdminGuard } from "../guard/admin.guard";
export const content: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("../../components/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    data: {
      breadcrumb: "Dashboard",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "profile",
    loadChildren: () =>
      import("../../components/profile/profile.module").then(
        (m) => m.ProfileModule
      ),
    canActivate: [AdminGuard],
    data: {
      roles: ["admin", "su_user"],
    },
  },
  
  // {
  //   path: "institute",
  //   loadChildren: () =>
  //     import("../../components/institute/institute.module").then(
  //       (m) => m.InstituteModule
  //     ),
  //   canActivate: [AdminGuard],
  //   data: {
  //     breadcrumb: "Students",
  //     roles: ["admin", "su_user"],
  //   },
  // },
  {
    path: "error",
    loadChildren: () =>
      import("../components/error-pages/error-pages.module").then(
        (m) => m.ErrorPagesModule
      ),
  },
];
