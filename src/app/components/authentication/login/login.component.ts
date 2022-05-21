import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service'
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

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
}
