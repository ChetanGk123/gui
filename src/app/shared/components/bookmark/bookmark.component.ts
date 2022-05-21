import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user'; 
import { AuthService } from '../../services/auth/auth.service';
import { NavService, Menu } from '../../services/nav.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  
  public menuItems  : Menu[] = [];
  public items  : Menu[] = [];
  public bookmaredkItems  : Menu[] = [];
  public text  : string
  public open  : boolean = false;
  public searchResult  : boolean = false;
  public searchResultEmpty  : boolean = false;
  public bookmarkItems : any[] = [];
  public user:User
  constructor(public navServices: NavService, public authService:AuthService) {  }

  ngOnInit() {
    this.user = this.authService.getUserData;
  	this.navServices.items.subscribe(menuItems => {
      this.items = menuItems 
      this.items.filter(items => {
        if(items.bookmark){
          this.bookmarkItems.push(items)
        }
      })
    });
    this.bookmaredkItems = JSON.parse(localStorage.getItem('bookmarkItems'))
    if(this.bookmaredkItems){
      this.bookmaredkItems.filter(item =>{
        this.bookmarkItems.push(item)
      })
    }
    if(this.bookmaredkItems){
      this.items.forEach(items =>{
        this.bookmaredkItems.forEach(bookeditem =>{if(items.title === bookeditem.title){items.bookmark = true}})
        if(items.children){
          items.children.forEach(child =>{
            this.bookmaredkItems.forEach(bookeditem =>{if(child.title === bookeditem.title){child.bookmark = true}})
          })
        }
      })
      this.bookmarkItems.filter(x=>{this.menuItems.push(x)})
    }
  }

  openBookmarkSearch() {
    this.open = !this.open
    this.removeFix();
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) {
     this.open = false
     return this.menuItems = [];
    }  
    let items = [];
    term = term.toLowerCase();
    this.items.filter(menuItems => {
        if(menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link' && menuItems.roles.indexOf(this.user.user_role) != -1){
          items.push(menuItems);
        }
        if(!menuItems.children) return false
          menuItems.children.filter(subItems => {
            if(subItems.title.toLowerCase().includes(term) && subItems.type === 'link' && subItems.roles.indexOf(this.user.user_role) != -1) {
              //subItems.icon = menuItems.icon
              items.push(subItems);
            }
            if(!subItems.children) return false
            subItems.children.filter(suSubItems => {
              if(suSubItems.title.toLowerCase().includes(term)) {
                suSubItems.icon = menuItems.icon
                items.push(suSubItems);
              }
            })
        })
          this.checkSearchResultEmpty(items)
          this.menuItems = items
    });
  }

  checkSearchResultEmpty(items) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.getElementById("canvas-bookmark").classList.add("offcanvas-bookmark");
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
    document.getElementById("canvas-bookmark").classList.remove("offcanvas-bookmark");
  }

  addToBookmark(items) {
    const index = this.bookmarkItems.indexOf(items);
    if(index === -1 && !items.bookmark){
      items.bookmark = true;
      this.bookmarkItems.push(items)
      this.text = "";
    } else {
      this.bookmarkItems.splice(index, 1);
      items.bookmark = false;
    }
    localStorage.setItem('bookmarkItems',JSON.stringify(this.bookmarkItems) )
  }

}
