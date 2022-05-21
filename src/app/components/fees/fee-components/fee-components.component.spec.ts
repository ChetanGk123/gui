import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeComponentsComponent } from './fee-components.component';

describe('FeeComponentsComponent', () => {
  let component: FeeComponentsComponent;
  let fixture: ComponentFixture<FeeComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
