import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffPopupComponent } from './edit-staff-popup.component';

describe('EditStaffPopupComponent', () => {
  let component: EditStaffPopupComponent;
  let fixture: ComponentFixture<EditStaffPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStaffPopupComponent]
    });
    fixture = TestBed.createComponent(EditStaffPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
