import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorPopupComponent } from './edit-doctor-popup.component';

describe('EditDoctorPopupComponent', () => {
  let component: EditDoctorPopupComponent;
  let fixture: ComponentFixture<EditDoctorPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDoctorPopupComponent]
    });
    fixture = TestBed.createComponent(EditDoctorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
