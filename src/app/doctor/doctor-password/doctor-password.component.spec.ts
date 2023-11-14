import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPasswordComponent } from './doctor-password.component';

describe('DoctorPasswordComponent', () => {
  let component: DoctorPasswordComponent;
  let fixture: ComponentFixture<DoctorPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPasswordComponent]
    });
    fixture = TestBed.createComponent(DoctorPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
