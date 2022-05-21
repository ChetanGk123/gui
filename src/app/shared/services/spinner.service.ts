import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  public showSpinner: boolean = false;

  getValue(): boolean {
    return this.showSpinner;
  }

  show() {
    this.showSpinner = true;
  }

  hide() {
    this.showSpinner = false;
  }
}
