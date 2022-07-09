import { AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service' 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public spinnerService:SpinnerService){}
  ngAfterViewInit(): void {
    this.spinner = this.spinnerService.getValue();
  }

  ngOnInit(): void {
    this.spinner = this.spinnerService.getValue();
  }
  title = 'endless-starterkit';
  spinner = this.spinnerService.getValue();
}
