import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { environment } from "environments/environment";
import { User, Role } from "app/auth/models";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "./api.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { LocckScreenComponent } from "app/main/pages/authentication/locck-screen/locck-screen.component";
import { AuthUtils } from "../helpers";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  //public
  public user: any;
  public currentUser: Observable<User>;
  public userActivity;
  public userInactive: Subject<any> = new Subject();

  //private
  private lockScreenRef: DynamicDialogRef;
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: ApiService, private _toastrService: ToastrService, public authUtils: AuthUtils, public dialogService: DialogService, private _router: Router,) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.user_role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.user_role === Role.Client;
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
          this.user = result.data;
          // store result details and jwt token in local storage to keep result logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(this.user));

          // Display welcome toast!
          this._toastrService.success("You have successfully logged in as an " + this.user.user_role + " user to Vuexy. Now you can start to explore. Enjoy! 🎉", "👋 Welcome, " + this.user.full_name + "!", { toastClass: "toast ngx-toastr", closeButton: true });
          // notify
          this.currentUserSubject.next(this.user);
          this.beginsesssion();
          if (this.lockScreenRef) this.lockScreenRef.close();
        } else {
          return result;
        }

        return this.user;
      }),
      catchError((err) => {
        return err;
      })
    );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    // notify
    this.currentUserSubject.next(null);
    if (this.lockScreenRef) this.lockScreenRef.close();
    this._router.navigate(['/pages/authentication/login-v2'])
  }

  /**
   * User logout
   *
   */
  lockScreen() {
    if (this.lockScreenRef) this.lockScreenRef.close();
    localStorage.removeItem("currentUser");
    this.lockScreenRef = this.dialogService.open(LocckScreenComponent, {
      header: "Unlock",
      width: "50%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
      closable: false,
    });
  }

  beginsesssion() {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      this.lockScreen();
    });
  }

  setTimeout() {
    var day1: any = AuthUtils.getTokenExpirationDate(this.currentUserSubject.value.token);
    var day2: any = new Date();
    this.userActivity = setTimeout(() => {
      if (this.currentUserSubject.value) {
        this.userInactive.next(undefined);
      }
    }, Math.floor(day1 - day2) - 5000);
  }

  getUser() {
    return this.currentUserSubject.value;
  }

}
