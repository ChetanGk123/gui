import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        //canActivate: [SecureInnerPagesGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'unlockuser',
        component: UnlockUserComponent
      },
      {
        path: 'forgetpassword',
        component: ForgetPwdComponent
      },
      {
        path: 'resetpassword',
        loadChildren: () => import('./reset-pwd/reset-pwd.module').then(m => m.ResetPwdModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  //providers: [AuthService, SecureInnerPagesGuard]
})
export class AuthenticationRoutingModule { }
