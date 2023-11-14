import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffPopupComponent } from './add-staff-popup.component';

describe('AddStaffPopupComponent', () => {
  let component: AddStaffPopupComponent;
  let fixture: ComponentFixture<AddStaffPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStaffPopupComponent]
    });
    fixture = TestBed.createComponent(AddStaffPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
