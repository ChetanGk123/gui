import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import configData from "../assets/config/config.data.json"
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor() {

  }
  ngOnInit() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }
}
