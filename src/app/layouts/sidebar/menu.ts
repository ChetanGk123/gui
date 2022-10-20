import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "Dashboard",
    isTitle: true,
  },
  {
    id: 2,
    label: "Dashboard",
    icon: "bx-home-circle",
    link: "/",
  },
  {
    id: 3,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 4,
    label: "Student",
    icon: "bx-user-circle",

    subItems: [
      {
        id: 5,
        label: "All Students",
        link: "/student",
        parentId: 2,
      },
      {
        id: 6,
        label: "Add",
        link: "/",
        parentId: 2,
      },
    ],
  },
  {
    id: 7,
    isLayout: true,
  },
];
