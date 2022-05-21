import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse, HttpResponse,} from "@angular/common/http";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiService } from "../services/auth/api.service";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public api: ApiService,public router: Router, public toastr:ToastrService,public authService:AuthService) {}
  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe (tap( 
        (response:any)=>{
          // if(request instanceof HttpRequest){
          //   var token = JSON.parse( localStorage.getItem('tocken')) ?? ""
          //   request = request.clone({
          //     setHeaders: {
          //       'Authorization': `Bearer ${token}`
          //     },  
          //   });
          // }
          if(response instanceof HttpResponse){
              if(response.body.message == "Your session has been expired, please login again!"){
                  this.router.navigate(["/auth/login"]);
                  this.toastr.error(response.body.message)
              }
              else if(response.body.message == "You're not authorised to access."){
                this.router.navigate(['auth/login']);
                this.toastr.error(response.body.message)
              }
          }
        },
        (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['auth/login']);
              }
            }
          }
        ));
    }
  
  }