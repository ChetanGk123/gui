import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './components/authentication/authentication.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from "ngx-cookie-service";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './shared/Interceptor/http.interceptor';
import { SharedModule } from './shared/shared.module';
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
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    AuthenticationModule,
  ],
  providers: [
    CookieService,{provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
