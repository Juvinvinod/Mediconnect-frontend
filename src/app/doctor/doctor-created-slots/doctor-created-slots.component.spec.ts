import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCreatedSlotsComponent } from './doctor-created-slots.component';

describe('DoctorCreatedSlotsComponent', () => {
  let component: DoctorCreatedSlotsComponent;
  let fixture: ComponentFixture<DoctorCreatedSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorCreatedSlotsComponent]
    });
    fixture = TestBed.createComponent(DoctorCreatedSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
