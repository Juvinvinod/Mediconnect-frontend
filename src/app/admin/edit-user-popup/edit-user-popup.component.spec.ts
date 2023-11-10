import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPopupComponent } from './edit-user-popup.component';

describe('EditUserPopupComponent', () => {
  let component: EditUserPopupComponent;
  let fixture: ComponentFixture<EditUserPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserPopupComponent]
    });
    fixture = TestBed.createComponent(EditUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
