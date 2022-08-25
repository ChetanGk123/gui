import { Routes } from "@angular/router";
import { AdminGuard } from "../guard/admin.guard";
export const content: Routes = [
  {
    path: "dashboard",
    loadChildren: () => import("../../components/dashboard/dashboard.module").then((m) => m.DashboardModule),
    data: {
      breadcrumb: "Dashboard",
      roles: ["admin", "su_user"],
    },
  },

  {
    path: "error",
    loadChildren: () => import("../components/error-pages/error-pages.module").then((m) => m.ErrorPagesModule),
  },
];
