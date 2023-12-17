import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewPasswordComponent } from './user-new-password.component';

describe('UserNewPasswordComponent', () => {
  let component: UserNewPasswordComponent;
  let fixture: ComponentFixture<UserNewPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserNewPasswordComponent]
    });
    fixture = TestBed.createComponent(UserNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
