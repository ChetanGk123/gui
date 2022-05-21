import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSubPagesComponent } from './register-sub-pages.component';

describe('RegisterSubPagesComponent', () => {
  let component: RegisterSubPagesComponent;
  let fixture: ComponentFixture<RegisterSubPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSubPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSubPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
