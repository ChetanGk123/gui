import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
// import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { map } from "rxjs/operators";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "../models/auth.models";
import { Role } from "../models/role";
import { ApiService } from "./api.service";
import { DialogService } from "primeng/dynamicdialog";
import { LockscreenComponent } from "src/app/account/auth/lockscreen/lockscreen.component";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;
  // public ref: DynamicDialogRef;
  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: ApiService, public dialogService: DialogService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
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
    return (
      this.currentUser && this.currentUserSubject.value.user_role === Role.Admin
    );
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return (
      this.currentUser &&
      this.currentUserSubject.value.user_role === Role.Client
    );
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
        console.log(result);

        // login successful if there's a jwt token in the response
        if (result.result && result.data.token) {
          var user = result.data;
          // store result details and jwt token in local storage to keep result logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));

          // Display welcome toast!
          // this._toastrService.success("You have successfully logged in as an " + user.user_role + " user to Vuexy. Now you can start to explore. Enjoy! 🎉", "👋 Welcome, " + user.full_name + "!", { toastClass: "toast ngx-toastr", closeButton: true });
          // notify
          this.currentUserSubject.next(user);
        }

        return user;
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
  }

  lockScreen() {
    const ref = this.dialogService.open(LockscreenComponent, {
            styleClass: 'w-full sm:w-10 md:w-6 lg:w-4',
      baseZIndex: 10000,
      closable: false,
      showHeader: false,
    });
  }
}
