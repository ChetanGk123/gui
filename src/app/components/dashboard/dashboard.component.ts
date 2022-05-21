import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AuthService } from '../../shared/services/auth/auth.service'

@Component({
  selector: 'app-dashboard',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router:Router,public authService:AuthService,public spinnerService:SpinnerService) { }

  ngOnInit() {
    
    switch (this.authService.getUserData.user_role) {
      case "admin":
          this.router.navigate(['dashboard/admin']);
        break;
      case "su_user":
          this.router.navigate(['dashboard/superAdmin']);
        break;
    
      default:
         this.router.navigate(['dashboard/admin']);
        break;
    }
  }

}
