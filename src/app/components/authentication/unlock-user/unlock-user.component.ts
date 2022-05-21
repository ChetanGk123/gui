import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth/auth.service'

@Component({
  selector: 'app-unlock-user',
  templateUrl: './unlock-user.component.html',
  styleUrls: ['./unlock-user.component.scss']
})
export class UnlockUserComponent implements OnInit {

  public unlockLoading:boolean = false;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(this.authService.getUserData),
    password: new FormControl('', [Validators.required])
  })

  constructor(public authService: AuthService,) { }

  ngOnInit() {
    this.unlockLoading = false;
   }

  async unlock(){
    this.unlockLoading = true;
    var result = await this.authService.Unlock(this.loginForm.value['password']);
    if(!result){
      this.unlockLoading = false;
    }
  }

  logOut(){
    this.authService.SignOut()
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
