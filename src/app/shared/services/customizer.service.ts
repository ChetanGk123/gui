import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigDB } from '../../shared/config/config';
import { ThemeService } from './theme.service'
@Injectable({
  providedIn: 'root'
})
export class CustomizerService implements OnInit{

  constructor(private themeService: ThemeService) {
    document.body.className = this.data.color.mix_layout;
    document.body.setAttribute("main-theme-layout", this.data.settings.layout_type);
    document.getElementsByTagName('html')[0].setAttribute('dir', this.data.settings.layout_type);
    var color = this.data.color.color;
    var layoutVersion = this.data.color.layout_version;
    if (color) {
      this.createStyle(color);
      if (layoutVersion)
        document.body.className = layoutVersion;
    }
  }
  ngOnInit() {
    var data = localStorage.getItem('layout_type');
    var theme = localStorage.getItem('theme');
    if(data)
    this.setLayout(data, theme);
  }

  // Configration Layout
  public data = ConfigDB.data

  // Create style sheet append in head
  createStyle(color) {
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = environment.loc + "assets/css/" + color + ".css";
    head.appendChild(link);
  }

  setLayout(layout: string,theme: string) {
    document.body.className = layout
    this.data.color.mix_layout = layout
    this.themeService.switchTheme(theme);
    localStorage.setItem('layout_type', layout);
    localStorage.setItem('theme', theme);
  }

}
