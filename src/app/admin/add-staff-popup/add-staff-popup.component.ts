import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminStaffService } from '../admin-staff.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-staff-popup',
  templateUrl: './add-staff-popup.component.html',
  styleUrls: ['./add-staff-popup.component.css']
})
export class AddStaffPopupComponent implements OnInit, OnDestroy {
  addStaffSubscription: Subscription | undefined = undefined;
  hide = true;
  staffForm!: FormGroup;
  @Output() userUpdated: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private ref: MatDialogRef<AddStaffPopupComponent>,
    private staffService: AdminStaffService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.staffForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ])
    });
  }

  onSubmit() {
    if (this.staffForm.valid) {
      this.addStaffSubscription = this.staffService
        .addStaffs(this.staffForm.value)
        .subscribe({
          next: () => {
            this.ref.close();
            this.snackBar.open('Successfully added', 'Dismiss', {
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
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }

  ngOnDestroy(): void {
    if (this.addStaffSubscription) {
      this.addStaffSubscription.unsubscribe();
    }
  }
}
