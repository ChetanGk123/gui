import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteStudentsComponent } from './promote-students.component';

describe('PromoteStudentsComponent', () => {
  let component: PromoteStudentsComponent;
  let fixture: ComponentFixture<PromoteStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoteStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
