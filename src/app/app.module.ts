import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './components/authentication/authentication.module'
import { CookieService } from "ngx-cookie-service";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './shared/Interceptor/http.interceptor';
import { SharedModule } from './shared/shared.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    AuthenticationModule,
  ],
  providers: [
    CookieService,{provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor, multi: true},
    MessageService,
    ConfirmationService,
    DialogService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
