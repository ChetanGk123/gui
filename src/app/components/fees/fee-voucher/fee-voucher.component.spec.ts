import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeVoucherComponent } from './fee-voucher.component';

describe('FeeVoucherComponent', () => {
  let component: FeeVoucherComponent;
  let fixture: ComponentFixture<FeeVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
