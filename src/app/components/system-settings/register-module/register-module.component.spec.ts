import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterModuleComponent } from './register-module.component';

describe('RegisterModuleComponent', () => {
  let component: RegisterModuleComponent;
  let fixture: ComponentFixture<RegisterModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
