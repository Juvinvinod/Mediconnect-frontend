import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorPopupComponent } from './add-doctor-popup.component';

describe('AddDoctorPopupComponent', () => {
  let component: AddDoctorPopupComponent;
  let fixture: ComponentFixture<AddDoctorPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDoctorPopupComponent]
    });
    fixture = TestBed.createComponent(AddDoctorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
