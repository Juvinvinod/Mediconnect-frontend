import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Staff } from 'src/app/shared/interfaces/staff';
import { AdminStaffService } from '../admin-staff.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-staff-popup',
  templateUrl: './edit-staff-popup.component.html',
  styleUrls: ['./edit-staff-popup.component.css']
})
export class EditStaffPopupComponent implements OnInit {
  editForm!: FormGroup;
  inputData: Staff | null = null;
  @Output() userUpdated: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Staff,
    private ref: MatDialogRef<EditStaffPopupComponent>,
    private staffService: AdminStaffService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    console.log(this.inputData);

    this.editForm = new FormGroup({
      first_name: new FormControl(
        this.inputData.first_name,
        Validators.required
      ),
      last_name: new FormControl(this.inputData.last_name, Validators.required),
      email: new FormControl(this.inputData.email, [
        Validators.required,
        Validators.email
      ]),
      mobile: new FormControl(this.inputData.mobile, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    });
    this.editForm.controls['email'].disable();
  }

  onSubmit() {
    if (this.editForm.valid && this.inputData && this.inputData._id) {
      this.staffService
        .updateStaff(this.inputData._id, this.editForm.value)
        .subscribe({
          next: () => {
            this.snackBar.open('Successfully updated', 'Dismiss', {
              duration: 5000
            });
            this.userUpdated.emit();
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
