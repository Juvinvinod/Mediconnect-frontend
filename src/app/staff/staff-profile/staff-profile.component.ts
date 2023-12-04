import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Staff } from 'src/app/shared/interfaces/staff';
import { StaffService } from '../staff.service';
import { AdminStaffService } from 'src/app/admin/admin-staff.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {
  signUpForm!: FormGroup;
  staffData: Staff | undefined = undefined;

  constructor(
    private staffService: StaffService,
    private adminStaffService: AdminStaffService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  // initializing reactive form when the component loads
  ngOnInit(): void {
    this.initializeForm();
    this.staffService.getStaffProfile().subscribe({
      next: (res) => {
        this.staffData = res;
        this.initializeForm();
      }
    });
  }

  initializeForm(): void {
    this.signUpForm = new FormGroup({
      first_name: new FormControl(
        this.staffData?.first_name || '',
        Validators.required
      ),
      last_name: new FormControl(
        this.staffData?.last_name || '',
        Validators.required
      ),
      email: new FormControl(this.staffData?.email || '', [
        Validators.required,
        Validators.email
      ]),
      mobile: new FormControl(this.staffData?.mobile || '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    });
  }

  //check for errors and update doctor in the database
  onSubmit() {
    const id = this.staffData?._id;
    if (id && this.signUpForm.valid) {
      this.adminStaffService.updateStaff(id, this.signUpForm.value).subscribe({
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
      console.log(this.signUpForm);
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }

  changePass() {
    this._router.navigate(['/staff/password']);
  }
}
