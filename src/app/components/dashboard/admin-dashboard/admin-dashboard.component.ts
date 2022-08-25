import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ApiService } from "src/app/shared/services/auth/api.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { SpinnerService } from "src/app/shared/services/spinner.service";
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
  today: number = Date.now();
  dashboardData: any;
  user: any;
  spinner: boolean = true;

  constructor(public spinnerService: SpinnerService, public apiService: ApiService, public authService: AuthService) {}

  async ngOnInit() {
    this.user = this.authService.getUserData;
    this.spinner = true;
    await this.apiService.getTypeRequest1("default_dashboard").then((res) => {
      this.spinner = false;
      this.dashboardData = res;
    });
    this.dashboardData.data.other.date_wise_admission_count.forEach((element) => {
      //// console.log(this.getAcademicYear(element));
    });
  }
}
