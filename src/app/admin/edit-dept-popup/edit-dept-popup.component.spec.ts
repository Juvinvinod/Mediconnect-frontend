import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeptPopupComponent } from './edit-dept-popup.component';

describe('EditDeptPopupComponent', () => {
  let component: EditDeptPopupComponent;
  let fixture: ComponentFixture<EditDeptPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDeptPopupComponent]
    });
    fixture = TestBed.createComponent(EditDeptPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
