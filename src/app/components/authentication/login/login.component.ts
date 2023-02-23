import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service'
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  displayLogins:boolean
  loader:boolean = false;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  })

  public showLoading
  constructor(public authService: AuthService, private fb: FormBuilder,public spinnerService: SpinnerService,) {
    
   }

  ngOnInit() {
    this.displayLogins = !environment.production
    this.loader= false;
      this.loginForm.patchValue({
        email:localStorage.getItem('email')??"",
        rememberMe:localStorage.getItem('email')?true:false
      })
      this.loginForm.updateValueAndValidity();
   }

  // Simple Login
  async login() {
    this.loader = true;
    this.showLoading = true
    if(this.loginForm.get('rememberMe').value){
      localStorage.setItem('email',this.loginForm.get('email').value)
    }
    else{
      localStorage.removeItem('email');
    }
    await this.authService.SignIn(this.loginForm.value['email'], this.loginForm.value['password']);
    this.showLoading = false
  }

  async loginWithData(username:any,password:any){
    this.loginForm.patchValue({
      email:localStorage.getItem(username),
      password:localStorage.getItem(password),
    })
    this.showLoading = true
    await this.authService.SignIn(username, password);
    this.showLoading = false
  }
}
