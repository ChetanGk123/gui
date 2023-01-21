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
    path: "profile",
    loadChildren: () => import("../../components/profile/profile.module").then((m) => m.ProfileModule),
    canActivate: [AdminGuard],
    data: {
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "student",
    loadChildren: () => import("../../components/student/student.module").then((m) => m.StudentModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Students",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "expense",
    loadChildren: () => import("../../components/expences/expences.module").then((m) => m.ExpencesModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Expenses",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "employee",
    loadChildren: () => import("../../components/employee/employee.module").then((m) => m.EmployeeModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Employees",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "general_Settings",
    loadChildren: () => import("../../components/general-settings/general-settings.module").then((m) => m.GeneralSettingsModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "General Settings",
      roles: ["su_user"],
    },
  },
  {
    path: "misc",
    loadChildren: () => import("../../components/misc/misc.module").then((m) => m.MiscModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Misc",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "calender",
    loadChildren: () => import("../../components/calender/calender.module").then((m) => m.CalenderModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Calender",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "fees",
    loadChildren: () => import("../../components/fees/fees.module").then((m) => m.FeesModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Fees",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "accounts",
    loadChildren: () => import("../../components/accounts/accounts.module").then((m) => m.AccountsModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Accounts",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "subjects",
    loadChildren: () => import("../../components/subjects/subjects.module").then((m) => m.SubjectsModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Subjects",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "system-settings",
    loadChildren: () => import("../../components/system-settings/system-settings.module").then((m) => m.SystemSettingsModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "System Settings",
      roles: ["su_user"],
    },
  },
  {
    path: "result-report",
    loadChildren: () => import("../../components/result-report/result-report.module").then((m) => m.ResultReportModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Result Report",
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
    path: "reports",
    loadChildren: () => import("../../components/reports/reports.module").then((m) => m.ReportsModule),
    canActivate: [AdminGuard],
    data: {
      breadcrumb: "Reports",
      roles: ["admin", "su_user"],
    },
  },
  {
    path: "error",
    loadChildren: () => import("../components/error-pages/error-pages.module").then((m) => m.ErrorPagesModule),
  },
];
