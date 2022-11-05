import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { User } from '../models/auth.models';
import CoreConfigData from "../../../assets/config/config.data.json"


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public token:string ="";
  public baseUrl = CoreConfigData.url;
  encPassword = environment.encPassword;
  constructor(private _http: HttpClient) {

  }

  httpLoginOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

   GetTocken(){
     try {
      var tocken:User =  <User>JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user"), this.encPassword.trim()).toString(CryptoJS.enc.Utf8));
      this.token = tocken.token;
      return tocken.token;
     } catch (error) {
       return "";
     }

  }

   get getTocken(): string{
    try {
      var tocken:User =  <User>JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user"), this.encPassword.trim()).toString(CryptoJS.enc.Utf8));
    return tocken.token;
    } catch (error) {
       return "";
    }
  }

  getTypeRequest(url: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.GetTocken()}`,
      }),
    };
    return this._http.get(`${this.baseUrl}${url}`, httpOptions ).pipe(map(res => {
      return res;
    }));
  }

  getTypeRequest1(url: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.GetTocken()}`,
      }),
    };
    return this._http.get(`${this.baseUrl}${url}`, httpOptions ).toPromise().then(res => {return res});
  }

  getFileTypeRequest(url: any) {

    return this._http.get(`${url}` ).pipe(map(res => {
      return res;
    }));
  }


  postLoginTypeRequest(url: any, payload: any) {
    return this._http.post(`${this.baseUrl}${url}`, payload, this.httpLoginOptions).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: any, payload: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.GetTocken()}`,
      }),
    };
    return this._http.post(`${this.baseUrl}${url}`, payload, httpOptions).pipe(map(res => {
      return res;
    }));
  }

  postFileTypeRequest(url: any, payload: any) {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }


  putTypeRequest(url: any, payload: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.GetTocken()}`,
      }),
    };
    return this._http.put(`${this.baseUrl}${url}`, payload, httpOptions).pipe(map(res => {
      return res;
    }));
  }

}
