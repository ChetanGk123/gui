import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHeadsComponent } from './account-heads.component';

describe('AccountHeadsComponent', () => {
  let component: AccountHeadsComponent;
  let fixture: ComponentFixture<AccountHeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
