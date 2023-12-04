import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  OnDestroy
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/user/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user-popup',
  templateUrl: './edit-user-popup.component.html',
  styleUrls: ['./edit-user-popup.component.css']
})
export class EditUserPopupComponent implements OnInit, OnDestroy {
  editUserSubscription: Subscription | undefined = undefined;
  editForm!: FormGroup;
  inputData: User | null = null;
  @Output() userUpdated: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private ref: MatDialogRef<EditUserPopupComponent>,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    console.log(this.inputData);

    this.editForm = new FormGroup({
      first_name: new FormControl(
        this.inputData?.first_name,
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
      this.editUserSubscription = this.adminService
        .updateUser(this.inputData._id, this.editForm.value)
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

  ngOnDestroy(): void {
    if (this.editUserSubscription) {
      this.editUserSubscription.unsubscribe();
    }
  }
}
