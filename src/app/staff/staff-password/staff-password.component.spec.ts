import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPasswordComponent } from './staff-password.component';

describe('StaffPasswordComponent', () => {
  let component: StaffPasswordComponent;
  let fixture: ComponentFixture<StaffPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffPasswordComponent]
    });
    fixture = TestBed.createComponent(StaffPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
