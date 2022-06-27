import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user';
import { AuthService } from './auth.service'; 
import * as CryptoJS from 'crypto-js';
import * as url from 'src/assets/data/url.json'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public token:string ="";
  public baseUrl = "";
  encPassword = environment.encPassword;
  constructor(private _http: HttpClient) {
    const data = url;
    this.baseUrl = data.apiUrl;
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
