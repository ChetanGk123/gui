import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { finalize, Observable } from "rxjs";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.isLoading.next(true);
    return next.handle(request).pipe(
      finalize(() => {

        // Set the status to false if there are any errors or the request is completed
        this.loadingService.isLoading.next(false);
      })
    );
  }
}
