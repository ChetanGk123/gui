import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../../model/user';
import { ApiService } from '../../services/auth/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { NavService, Menu, custonMenu } from '../../services/nav.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  user: User
  public menuItems: custonMenu[] =[];
  public url: any;

  constructor(private router: Router, public navServices: NavService, public authService:AuthService,public apiService:ApiService) {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.menuItems.filter(items => {
            if (items.path === event.url)
              this.setNavActive(items)
            if (!items.children) return false
            items.children.filter(subItems => {
              if (subItems.path === event.url)
                this.setNavActive(subItems)
              if (!subItems.children) return false
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url)
                  this.setNavActive(subSubItems)
              })
            })
          })
        }
      })
    })
    
  /*  use this code */

  // this.fetchData().then(result => { this.menuItems = result})
  //     this.router.events.subscribe((event) => {
  //       if (event instanceof NavigationEnd) {
  //         this.menuItems.filter(items => {
  //           if (items.path === event.url)
  //             this.setNavActive(items)
  //           if (!items.children) return false
  //           items.children.filter(subItems => {
  //             if (subItems.path === event.url)
  //               this.setNavActive(subItems)
  //             if (!subItems.children) return false
  //             subItems.children.filter(subSubItems => {
  //               if (subSubItems.path === event.url)
  //                 this.setNavActive(subSubItems)
  //             })
  //           })
  //         })
  //       }
  //     })
  
  /*  use this code */
    
  }

  async fetchData(){
		var data:custonMenu[] = await this.apiService.getTypeRequest('role_gui/3').toPromise().then((result:any) => {
      return result.data.modules;
		})
		return data;
	}

  ngOnInit(): void {
    this.user= this.authService.getUserData;
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem != item)
        menuItem.active = false
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true
            submenuItems.active = true
          }
        })
      }
    })
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item))
          a.active = false
        if (!a.children) return false
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false
          }
        })
      });
    }
    item.active = !item.active
  }

  collapseSidebar() {
    if(window.innerWidth < 550)
    this.navServices.collapseSidebar = false
  }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

}
