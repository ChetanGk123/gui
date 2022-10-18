import { Component, OnInit, Output, EventEmitter, Inject } from "@angular/core";
import { NavService, Menu } from "../../services/nav.service";
import { DOCUMENT } from "@angular/common";
import { AuthService } from "../../services/auth/auth.service";
import { User } from "../../model/user";
import { Router } from "@angular/router";
import { CustomizerService } from "../../services/customizer.service";

var body = document.getElementsByTagName("body")[0];

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  user: User;
  public menuItems: Menu[];
  public items: Menu[];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public openNav: boolean = false;
  public right_sidebar: boolean = false;
  public text: string;
  public elem;
  public isOpenMobile: boolean = false;
  public customizer: any;
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public customize: CustomizerService, public navServices: NavService, public authService: AuthService, public router: Router, @Inject(DOCUMENT) private document: any) {}

  OpenProfile() {
    this.router.navigate(["/profile"]);
  }

  ngOnDestroy() {
    this.removeFix();
  }

  right_side_bar() {
    this.right_sidebar = !this.right_sidebar;
    this.rightSidebarEvent.emit(this.right_sidebar);
  }

  collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  customizeMixLayout() {
    if (this.customize.data.color.mix_layout == "default") {
      this.customize.setLayout("dark-only", "bootstrap4-dark-blue");
      this.customizer = "moon";
    } else {
      this.customize.setLayout("default", "bootstrap4-light-blue");
      this.customizer = "sun";
    }
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return (this.menuItems = []);
    let items = [];
    term = term.toLowerCase();
    this.items.filter((menuItems) => {
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === "link" && menuItems.roles.indexOf(this.user.user_role) != -1) {
        items.push(menuItems);
      }
      if (!menuItems.children) return false;
      menuItems.children.filter((subItems) => {
        if (subItems.title.toLowerCase().includes(term) && subItems.type === "link" && subItems.roles.indexOf(this.user.user_role) != -1) {
          subItems.icon = menuItems.icon;
          items.push(subItems);
        }
        if (!subItems.children) return false;
        subItems.children.filter((suSubItems) => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon;
            items.push(suSubItems);
          }
        });
      });
      this.checkSearchResultEmpty(items);
      this.menuItems = items;
    });
  }

  checkSearchResultEmpty(items) {
    if (!items.length) this.searchResultEmpty = true;
    else this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    body.classList.add("offcanvas");
  }

  removeFix() {
    this.searchResult = false;
    body.classList.remove("offcanvas");
    this.text = "";
  }
  ngOnInit() {
    if (this.customize.data.color.mix_layout == "default") {
      this.customizer = "sun";
    } else {
      this.customizer = "moon";
    }

    this.user = this.authService.getUserData;
    this.elem = document.documentElement;
    this.navServices.items.subscribe((menuItems) => {
      this.items = menuItems;
    });
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  signout() {
    this.authService.SignOut();
  }

  lockScreen() {
    this.authService.lockScreen();
  }
}
