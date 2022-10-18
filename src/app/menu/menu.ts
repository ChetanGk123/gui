import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'collapsible',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'home',
    badge: {
      title: '1',
      translate: 'MENU.DASHBOARD.BADGE',
      classes: 'badge-light-warning badge-pill'
    },
    children: [
      {
        // If role is not assigned will be display to all
        id: 'ecommerce',
        title: 'eCommerce',
        translate: 'MENU.DASHBOARD.ECOMMERCE',
        type: 'item',
        icon: 'circle',
        url: 'dashboard/ecommerce'
      }
    ]
  },
];
