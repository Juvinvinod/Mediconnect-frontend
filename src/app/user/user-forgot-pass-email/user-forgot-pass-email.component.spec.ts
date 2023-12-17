import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForgotPassEmailComponent } from './user-forgot-pass-email.component';

describe('UserForgotPassEmailComponent', () => {
  let component: UserForgotPassEmailComponent;
  let fixture: ComponentFixture<UserForgotPassEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserForgotPassEmailComponent]
    });
    fixture = TestBed.createComponent(UserForgotPassEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
