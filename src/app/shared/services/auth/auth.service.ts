import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { ActivatedRoute, Router } from "@angular/router";
import { apiResponse, User } from "../../model/user";
import { environment } from "src/environments/environment";
import { ApiService } from "./api.service";
import { SpinnerService } from "../spinner.service";  
import * as CryptoJS from 'crypto-js'; 
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

import { UnlockUserComponent } from "src/app/components/authentication/unlock-user/unlock-user.component";
import { JwtHelperService } from "@auth0/angular-jwt";

export interface ILogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userData: User;
  public userActivity;
  public returnUrl: string;
  public userInactive: Subject<any> = new Subject();
  public tempUserData: User;
  encPassword = environment.encPassword; 

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
    public toster: ToastrService,
    private cookieService: CookieService,
    public spinnerService: SpinnerService,
    public ApiService: ApiService
  ) {}

  beginsesssion() {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      this.lockScreen();
    });
  }

  async SignIn(email, password) {
    try {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      debugger
      this.spinnerService.show();
      var login: ILogin = { 
        username: email,
        password: password,
      };
      var response: any;
      this.tempUserData = null;
      await this.ApiService.postLoginTypeRequest("user_login", login)
        .toPromise()
        .then((result: any) => (response = result));
      
      if (response.result) {
        await this.setUserData(response.data);
        this.beginsesssion();
        
        if (this.ref) this.ref.close();
          this.router.navigateByUrl(this.returnUrl);
        this.toster.success("Welcomeback " + response.data.full_name);
        
        return true;
      } else {
        this.spinnerService.hide();
        this.toster.error(response.message);
        return false;
      }

    } catch (error) {
      this.toster.error(error.error.message);
      return false;
    }
  }

  async Unlock(password) {
    this.spinnerService.show();
    var username = await this.getUserData.user_name;
     return this.SignIn(username, password);
  }

  SignOut() {
    if (this.ref) this.ref.close();
    localStorage.removeItem("user");
    localStorage.removeItem("selectedStudent");
    this.router.navigate(["/auth/login"]);
  }

  lockScreen() {
    // var returnUrl = this.route.snapshot.outlet;
    var returnUrl = this.router.url;
    this.ref = this.dialogService.open(UnlockUserComponent, {
      width: '50%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      closable: false,
  });
    localStorage.removeItem("user");
    //this.router.navigate(["/auth/unlock"], { queryParams: { returnUrl: returnUrl } });
  }

  get isLoggedIn(): boolean {
    const user = this.getUserData;
    return user != null ? true : false;
  }

  get getUserData(): User {
    if (localStorage.getItem("user")) {
      try {
        this.userData = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user"), this.encPassword.trim()).toString(CryptoJS.enc.Utf8));
      } catch (error) {
        this.userData == null
      } 
    }
    return this.userData;
  }

  async setUserData(data: any) {
    this.userData = await data;
    var enc = CryptoJS.AES.encrypt(JSON.stringify(this.userData), this.encPassword).toString();
        localStorage.setItem("user", enc);
  }


  setTimeout() {
    const helper = new JwtHelperService();
    var day1:any = helper.getTokenExpirationDate(this.getUserData.token);
    var day2:any = new Date(); 
    // console.log("time left "+Math.floor((day1 - day2)-5000));
    
    
    this.userActivity = setTimeout(() => {
      if (this.getUserData) {
        this.userInactive.next(undefined);
      }
    }, Math.floor(day1 - day2)-5000);
  }

  get TockenExpiry():number{
    const helper = new JwtHelperService();
    var day1:any = helper.getTokenExpirationDate(this.getUserData.token);
    var day2:any = new Date();
    return Math.floor(day1 - day2)
  }
}
