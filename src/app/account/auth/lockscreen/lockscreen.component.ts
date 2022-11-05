import { Component, OnInit } from "@angular/core";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { BehaviorSubject } from "rxjs";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { User } from "src/app/core/types";

@Component({
  selector: "app-lockscreen",
  templateUrl: "./lockscreen.component.html",
  styleUrls: ["./lockscreen.component.scss"],
})

/**
 * Lock-screen component
 */
export class LockscreenComponent implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();
  currentUser: User;
  public error = "";
  loading: boolean = false;
  password: string = "";
  ref: DynamicDialogRef;

  constructor(
    private _authenticationService: AuthenticationService,
    private _authService: AuthenticationService
  ) {
    this.currentUser = this._authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.loading = false;
  }

  //   {
  //     "result": false,
  //     "message": "Invalid username or password",
  //     "status": "danger",
  //     "icon": "error"
  // }
  async unlock() {
    if (this.password.length > 0) {
      this.error = "";
      this.loading = true;
      this._authService
        .unlockScreen(this.currentUser.user_name, this.password)
        .subscribe((data: any) => {
          if (data?.result == false) {
            this.error = data.message;
          } else {
            if (this.ref) this.ref.close();
          }
          this.loading = false;
        });
    } else {
      this.error = "Please enter the password";
    }
  }

  logout() {
    this._authService.logout();
  }
}
