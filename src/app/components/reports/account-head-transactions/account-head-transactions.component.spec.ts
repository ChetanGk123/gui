import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHeadTransactionsComponent } from './account-head-transactions.component';

describe('AccountHeadTransactionsComponent', () => {
  let component: AccountHeadTransactionsComponent;
  let fixture: ComponentFixture<AccountHeadTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHeadTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHeadTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
