import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSlotComponent } from './doctor-slot.component';

describe('DoctorSlotComponent', () => {
  let component: DoctorSlotComponent;
  let fixture: ComponentFixture<DoctorSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorSlotComponent]
    });
    fixture = TestBed.createComponent(DoctorSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
