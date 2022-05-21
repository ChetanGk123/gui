import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesNRegulationsComponent } from './rules-n-regulations.component';

describe('RulesNRegulationsComponent', () => {
  let component: RulesNRegulationsComponent;
  let fixture: ComponentFixture<RulesNRegulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesNRegulationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesNRegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
