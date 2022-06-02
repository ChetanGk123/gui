import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueFeesReportComponent } from './due-fees-report.component';

describe('DueFeesReportComponent', () => {
  let component: DueFeesReportComponent;
  let fixture: ComponentFixture<DueFeesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueFeesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueFeesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
