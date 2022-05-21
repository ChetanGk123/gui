import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  public feeGroup:any;
  constructor() { }

  setFeeGroup(data){
    this.feeGroup = data;
  }
  get getFeeGroup():any{
    return this.feeGroup
  }
}
