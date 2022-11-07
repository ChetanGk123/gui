import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";

import { environment } from "../environments/environment";

import {
  NgbNavModule,
  NgbAccordionModule,
  NgbTooltipModule,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";

import { ExtrapagesModule } from "./extrapages/extrapages.module";

import { LayoutsModule } from "./layouts/layouts.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initFirebaseBackend } from "./authUtils";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ErrorInterceptor } from "./core/helpers/error.interceptor";
import { JwtInterceptor } from "./core/helpers/jwt.interceptor";
import { FakeBackendInterceptor } from "./core/helpers/fake-backend";
import { DialogService } from "primeng/dynamicdialog";
import { CoreModule } from "./core/core.module";
import { coreConfig } from "./app-config";
import { AuthUtils } from "./core/utils/auth.utils";
import { SharedModule } from "./shared/shared.module";
import { LoadingInterceptor } from "./core/helpers/loading.interceptor";
import { ServiceWorkerModule } from "@angular/service-worker";

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTooltipModule,
    SharedModule,
    CoreModule.forRoot(coreConfig),
    ScrollToModule.forRoot(),
    NgbModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    DialogService,
    AuthUtils,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
})
export class AppModule {}
