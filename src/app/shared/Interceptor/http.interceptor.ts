import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiService } from "../services/auth/api.service";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public api: ApiService, public router: Router, public toastr: ToastrService, public authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (response: any) => {
          if (response instanceof HttpResponse) {
            if (response.body.result) {
            } else {
              this.toastr.error(response.body.message);
              if (response.body.message == "Your session has been expired, please login again!" || response.body.message == "You're not authorised to access.") {
                this.router.navigate(["/auth/login"]);
              }
            }
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.toastr.error(err.message);
            if (err.status === 401) {
              this.router.navigate(["auth/login"]);
            }
          }
        }
      )
    );
  }
}
