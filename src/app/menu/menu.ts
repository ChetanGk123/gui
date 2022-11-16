import { CoreMenu } from "@core/types";

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: "dashboard",
    title: "Dashboard",
    translate: "MENU.DASHBOARD.COLLAPSIBLE",
    type: "collapsible",
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: "home",
    badge: {
      title: "1",
      translate: "MENU.DASHBOARD.BADGE",
      classes: "badge-light-warning badge-pill",
    },
    children: [
      {
        // If role is not assigned will be display to all
        id: "ecommerce",
        title: "eCommerce",
        translate: "MENU.DASHBOARD.ECOMMERCE",
        type: "item",
        icon: "circle",
        url: "dashboard/ecommerce",
      },
      {
        // If role is not assigned will be display to all
        id: "misc",
        title: "Misc",
        translate: "MENU.DASHBOARD.MISC",
        type: "item",
        icon: "circle",
        url: "misc",
      },
    ],
  },
  {
    id: "calendar",
    title: "Calendar",
    translate: "MENU.APPS.CALENDAR",
    type: "item",
    icon: "calendar",
    url: "calendar",
  },
  {
    id: "student_info",
    type: 'collapsible',
    title: 'Student Info',
    translate: 'MENU.Student_Info.COLLAPSIBLE',
    icon: 'user',
    children: [
      {
        id: 'email',
        title: 'Email',
        translate: 'MENU.APPS.EMAIL',
        type: 'item',
        icon: 'user',
        url: 'apps/email'
      },
    ]
  },
  {
    id: "human_resource",
    type: 'collapsible',
    title: 'Human Resource',
    translate: 'MENU.Human_Resource.COLLAPSIBLE',
    icon: 'users',
    children: [
      {
        id: 'email',
        title: 'Email',
        translate: 'MENU.APPS.SECTION',
        type: 'item',
        icon: 'circle',
        url: 'apps/email'
      },
    ]
  },
  {
    id: "fees_collection",
    type: 'collapsible',
    title: 'Fees Collection',
    translate: 'MENU.Fees_collection.COLLAPSIBLE',
    icon: 'credit-card',
    children: [
      {
        id: 'email',
        title: 'Email',
        translate: 'MENU.APPS.SECTION',
        type: 'item',
        icon: 'circle',
        url: 'apps/email'
      },
    ]
  },
  {
    id: "accounts",
    type: 'collapsible',
    title: 'Account',
    translate: 'MENU.ACCOUNTS.COLLAPSIBLE',
    icon: 'archive',
    children: [
      {
        id: 'email',
        title: 'Email',
        translate: 'MENU.APPS.SECTION',
        type: 'item',
        icon: 'circle',
        url: 'apps/email'
      },
    ]
  },
  {
    id: "expenses",
    title: "Expenses",
    translate: "MENU.EXPENSES.EXPENSES",
    type: "item",
    icon: "shopping-bag",
    url: "calendar",
  },
  
  {
    id: "reports",
    type: 'collapsible',
    title: 'Reports',
    translate: 'MENU.REPORTS.COLLAPSIBLE',
    icon: 'file-text',
    children: [
      {
        id: 'email',
        title: 'Email',
        translate: 'MENU.APPS.SECTION',
        type: 'item',
        icon: 'circle',
        url: 'apps/email'
      },
    ]
  },
];
