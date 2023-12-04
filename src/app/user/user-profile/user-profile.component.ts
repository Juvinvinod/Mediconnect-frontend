import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { UserService } from '../user.service';
import { AdminService } from 'src/app/admin/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userForm!: FormGroup;
  doctorData: User | undefined = undefined;

  constructor(
    private userService: UserService,
    private adminUserService: AdminService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  // initializing reactive form when the component loads
  ngOnInit(): void {
    this.initializeForm();
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        this.doctorData = res;
        this.initializeForm();
      }
    });
  }

  initializeForm(): void {
    this.userForm = new FormGroup({
      first_name: new FormControl(
        this.doctorData?.first_name || '',
        Validators.required
      ),
      last_name: new FormControl(
        this.doctorData?.last_name || '',
        Validators.required
      ),
      email: new FormControl(this.doctorData?.email || '', [
        Validators.required,
        Validators.email
      ]),
      mobile: new FormControl(this.doctorData?.mobile || '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    });
    this.userForm.controls['email'].disable();
  }

  //check for errors and update doctor in the database
  onSubmit() {
    const id = this.doctorData?._id;
    if (id && this.userForm.valid) {
      this.adminUserService.updateUser(id, this.userForm.value).subscribe({
        next: () => {
          this._router.navigate(['']);
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
      console.log(this.userForm);
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }

  changePass() {
    this._router.navigate(['/password']);
  }
}
