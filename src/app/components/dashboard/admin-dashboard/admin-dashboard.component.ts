import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import * as chartData from '../../../shared/data/dashboard/university';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {

  
  today: number = Date.now();
  
  constructor(public spinnerService:SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.hide()
  }

  public admissionChartType = chartData.admissionChartType;
  public admissionChartLabels = chartData.admissionChartLabels;
  public admissionChartData = chartData.admissionChartData;
  public admissionChartOptions = chartData.admissionChartOptions;
  public admissionChartColors = chartData.admissionChartColors;
  public admissionChartLegend = chartData.admissionChartLegend;

}
