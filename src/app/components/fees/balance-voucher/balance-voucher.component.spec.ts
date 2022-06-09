import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceVoucherComponent } from './balance-voucher.component';

describe('BalanceVoucherComponent', () => {
  let component: BalanceVoucherComponent;
  let fixture: ComponentFixture<BalanceVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
