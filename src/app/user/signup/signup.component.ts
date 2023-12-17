import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  doctorSubscription: Subscription | undefined = undefined;
  hide = true;
  signUpForm!: FormGroup;

  constructor(
    private userService: UserService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  // initializing reactive form when the component loads
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
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

  //check for errors and save the user in the database
  onSubmit() {
    if (this.signUpForm.valid) {
      this.doctorSubscription = this.userService
        .proceedRegister(this.signUpForm.value)
        .subscribe({
          next: () => {
            this._router.navigate(['../emailsend']);
            this.snackBar.open('Successfully registered', 'Dismiss', {
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

  ngOnDestroy(): void {
    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }
  }
}
