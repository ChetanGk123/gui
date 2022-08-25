import { Injectable, HostListener } from "@angular/core";
import { BehaviorSubject, Observable, Subscriber } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import { map } from "rxjs/operators";
import { ApiService } from "./auth/api.service";
//import * as MenuData from 'src/assets/data/data.json'
// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  roles: string[];
  children?: Menu[];
}
export interface custonMenu {
  active?: boolean;
  badgeType?: string;
  badgeValue?: string;
  bookmark?: boolean;
  children?: custonMenu[];
  icon?: string;
  module_id?: string;
  path?: string;
  permissions?: string;
  title?: string;
  type?: string;
  roles?: string[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen = false;

  constructor(public http: HttpClient, public apiService: ApiService) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }

    //this.fetchData()
  }

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  items1: custonMenu[] = [];
  list: Menu;
  async fetchData() {
    var d: custonMenu[] = await this.apiService
      .getTypeRequest("gui_options")
      .toPromise()
      .then((result: any) => {
        this.items1 = result.data.modules;
        return this.items1;
      });
    return d;
  }

  addDataToList(iteems: any[]) {
    iteems.map((x) => {
      this.list.path = "";
    });
  }

  MENUITEMS: Menu[] = [
    {
      path: "/dashboard",
      title: "Dashboard",
      icon: "home",
      type: "link",
      roles: ["Admin", "ADMISSION OFFICER", "su_user"],
    },
    {
      path: "/profile",
      title: "Profile",
      icon: "user",
      type: "link",
      roles: ["su_user"],
    },
    // {
    // 	title: 'General Settings', icon: 'settings', type: 'sub', active: false,roles:['Admin'] , children: [
    // 		{ path: '/general_Settings/instituteProfile', icon: 'settings', title: 'Institute Profile', type: 'link',roles:['Admin'] },
    // 		{ path: '/general_Settings/rulesNRegulations', icon: 'settings', title: 'Rules & Regulations', type: 'link',roles:['Admin'] },
    // 		{ path: '/general_Settings/marksGrading', icon: 'settings', title: 'Marks Grading', type: 'link',roles:['Admin'] },
    // 	]
    // },
  ];
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
  //ListItems = new BehaviorSubject<custonMenu[]>(this.items1)
}
