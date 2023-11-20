import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeptPopupComponent } from './add-dept-popup.component';

describe('AddDeptPopupComponent', () => {
  let component: AddDeptPopupComponent;
  let fixture: ComponentFixture<AddDeptPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeptPopupComponent]
    });
    fixture = TestBed.createComponent(AddDeptPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
