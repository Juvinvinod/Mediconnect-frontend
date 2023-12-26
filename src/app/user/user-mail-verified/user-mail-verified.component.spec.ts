import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMailVerifiedComponent } from './user-mail-verified.component';

describe('UserMailVerifiedComponent', () => {
  let component: UserMailVerifiedComponent;
  let fixture: ComponentFixture<UserMailVerifiedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMailVerifiedComponent]
    });
    fixture = TestBed.createComponent(UserMailVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
