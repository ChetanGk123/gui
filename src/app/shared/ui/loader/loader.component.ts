import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { LoaderService } from "../../../core/services/loader.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit, AfterViewChecked {
  loading: boolean = true;

  constructor(
    private loaderService: LoaderService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }
  ngOnInit(): void {}
}
