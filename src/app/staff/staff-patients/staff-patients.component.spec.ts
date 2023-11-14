import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPatientsComponent } from './staff-patients.component';

describe('StaffPatientsComponent', () => {
  let component: StaffPatientsComponent;
  let fixture: ComponentFixture<StaffPatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffPatientsComponent]
    });
    fixture = TestBed.createComponent(StaffPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
