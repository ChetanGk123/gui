import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTcComponent } from './assigned-tc.component';

describe('AssignedTcComponent', () => {
  let component: AssignedTcComponent;
  let fixture: ComponentFixture<AssignedTcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
