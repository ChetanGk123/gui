import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "app/auth/service";

@Component({
  selector: "app-locck-screen",
  templateUrl: "./locck-screen.component.html",
  styleUrls: ["./locck-screen.component.scss"],
})
export class LocckScreenComponent implements OnInit {
  public passwordTextType = false;
  constructor(private _authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  /**
   * Toggle Password Text Type
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  logout() {
    this._authenticationService.logout();
  }
}
