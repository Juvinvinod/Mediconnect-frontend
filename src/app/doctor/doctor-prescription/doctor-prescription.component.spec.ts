import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPrescriptionComponent } from './doctor-prescription.component';

describe('DoctorPrescriptionComponent', () => {
  let component: DoctorPrescriptionComponent;
  let fixture: ComponentFixture<DoctorPrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPrescriptionComponent]
    });
    fixture = TestBed.createComponent(DoctorPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
