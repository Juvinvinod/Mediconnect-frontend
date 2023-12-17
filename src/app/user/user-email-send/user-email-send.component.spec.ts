import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailSendComponent } from './user-email-send.component';

describe('UserEmailSendComponent', () => {
  let component: UserEmailSendComponent;
  let fixture: ComponentFixture<UserEmailSendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEmailSendComponent]
    });
    fixture = TestBed.createComponent(UserEmailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
