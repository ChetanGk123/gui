import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
// import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { map } from "rxjs/operators";

import { Role } from "../models/role";
import { ApiService } from "./api.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { LockscreenComponent } from "src/app/account/auth/lockscreen/lockscreen.component";
import * as CryptoJS from "crypto-js";
import { UserService } from "./user.service";
import { environment } from "src/environments/environment";
import { User } from "../types";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  //public
  encPassword = environment.encPassword;
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  private _authenticated: boolean = false;
  ref: DynamicDialogRef;
  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(
    private _http: ApiService,
    public dialogService: DialogService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  get accessToken(): string {
    return localStorage.getItem("accessToken") ?? "";
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    var login = {
      username: email,
      password: password,
    };
    return this._http.postTypeRequest(`user_login`, login).pipe(
      map((result: any) => {
        // login successful if there's a jwt token in the response
        if (result.result && result.data.token) {
          if (this.ref) this.ref.close();
          var user = result.data;
          // store result details and jwt token in local storage to keep result logged in between page refreshes
          this.setUser(user);

          // Display welcome toast!
          // this._toastrService.success("You have successfully logged in as an " + user.user_role + " user to Vuexy. Now you can start to explore. Enjoy! 🎉", "👋 Welcome, " + user.full_name + "!", { toastClass: "toast ngx-toastr", closeButton: true });
          // notify
          this.currentUserSubject.next(user);
          return user;
        }else{
          return result
        }

      })
    );
  }

  setUser(user: User) {
    try {
      var enc = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        this.encPassword
      ).toString();
      localStorage.setItem("currentUser", enc);
    } catch (error) {
      // //
    }
  }

  getUser() {
    try {
      var user = localStorage.getItem("currentUser")
        ? JSON.parse(
            CryptoJS.AES.decrypt(
              localStorage.getItem("currentUser"),
              this.encPassword.trim()
            ).toString(CryptoJS.enc.Utf8)
          )
        : null;

      if (user) {
        return user;
      } else {
        this.logout();
        return null;
      }
    } catch (error) {
      this.logout();
      return null;
    }
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this._router.navigate(["/account/login"]);
    if (this.ref) this.ref.close();
    // notify
    //this.currentUserSubject.next(null);
  }

  lockScreen() {
    var data = this.getUser();
    if (data?.token) {
      localStorage.removeItem("user");
      data.token = null;
      this.setUser(data);
    }
    this.ref = this.dialogService.open(LockscreenComponent, {
      styleClass: "w-full sm:w-10 md:w-6 lg:w-4",
      baseZIndex: 10000,
      closable: false,
      showHeader: false,
    });
  }

  unlockScreen(email: string, password: string) {
    return this.login(email, password)
  }
}
