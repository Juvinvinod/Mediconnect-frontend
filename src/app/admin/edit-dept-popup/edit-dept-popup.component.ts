import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dept-popup',
  templateUrl: './edit-dept-popup.component.html',
  styleUrls: ['./edit-dept-popup.component.css']
})
export class EditDeptPopupComponent implements OnInit {
  editForm!: FormGroup;
  inputData: { _id: string; dept_name: string } | null = null;
  @Output() deptUpdated: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { _id: string; dept_name: string },
    private ref: MatDialogRef<EditDeptPopupComponent>,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.editForm = new FormGroup({
      dept_name: new FormControl(this.inputData.dept_name, Validators.required)
    });
  }

  onSubmit() {
    if (this.editForm.valid && this.inputData && this.inputData._id) {
      this.adminService
        .editDepartment(this.inputData._id, this.editForm.value)
        .subscribe({
          next: () => {
            this.snackBar.open('Successfully updated', 'Dismiss', {
              duration: 5000
            });
            this.deptUpdated.emit();
          },
          error: (error) => {
            this.snackBar.open(error.error.errors[0].message, 'Dismiss', {
              duration: 2000
            });
          }
        });
    } else {
      console.log(this.editForm);
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }

  closePopup() {
    this.ref.close();
  }
}
