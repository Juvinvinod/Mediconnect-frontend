import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {
  hide = true;
  hideConfirm = true;
  passwordForm!: FormGroup;
  userData: User | undefined = undefined;

  constructor(
    private userService: UserService,
    private router: Router,
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
      this.userService.updatePassword(this.passwordForm.value).subscribe({
        next: () => {
          this.router.navigate(['doctor']);
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
