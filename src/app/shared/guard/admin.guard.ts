import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from '../services/auth/api.service';
import { AuthService } from '../services/auth/auth.service';
import { SpinnerService } from '../services/spinner.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public router: Router, public authService:AuthService, public toastr:ToastrService, public apiService:ApiService,public spinnerService: SpinnerService,) { }
    
   async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Guard for user is login or not
    let user:any =this.authService.getUserData; 
  const helper = new JwtHelperService();
  const TokenExpired = helper.isTokenExpired(user?.token);
  
    if(user?.token){
      // if (next.data.roles && next.data.roles.indexOf(user.user_role) === -1) {
      //   this.toastr.error("You are not allowed to access this page")
      //   this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      //   return false
      // }
      if(!TokenExpired){
        return true
      }else{
        this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
          return false;
      }
    }
    else{
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    
  }

  async isTokenValid(){
    try {
      var response;
      await this.apiService.getTypeRequest('check_token').toPromise().then((result:any)=>{response= result})
      return response
    } catch (error) {
      
    }
 }
}
