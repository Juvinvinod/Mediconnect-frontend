import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Staff } from 'src/app/shared/interfaces/staff';
import { StaffService } from '../staff.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-staff-password',
  templateUrl: './staff-password.component.html',
  styleUrls: ['./staff-password.component.css']
})
export class StaffPasswordComponent implements OnInit {
  hide = true;
  hideConfirm = true;
  passwordForm!: FormGroup;
  staffData: Staff | undefined = undefined;

  constructor(
    private staffService: StaffService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  // initializing reactive form when the component loads
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]),
      confirm_password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ])
    });
  }

  //check for errors and update doctor password in the database
  onSubmit() {
    if (this.passwordForm.valid) {
      this.staffService.updatePassword(this.passwordForm.value).subscribe({
        next: () => {
          this._router.navigate(['staff']);
          this.snackBar.open('Successfully updated', 'Dismiss', {
            duration: 5000
          });
        },
        error: (error) => {
          this.snackBar.open(error.error.errors[0].message, 'Dismiss', {
            duration: 2000
          });
        }
      });
    } else {
      console.log(this.passwordForm);
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }
}
