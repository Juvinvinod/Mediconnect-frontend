import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from 'src/app/shared/interfaces/doctor';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-password',
  templateUrl: './doctor-password.component.html',
  styleUrls: ['./doctor-password.component.css']
})
export class DoctorPasswordComponent implements OnInit {
  hide = true;
  hideConfirm = true;
  signUpForm!: FormGroup;
  doctorData: Doctor | undefined = undefined;

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // initializing reactive form when the component loads
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signUpForm = new FormGroup({
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
    if (this.signUpForm.valid) {
      this.doctorService.updatePassword(this.signUpForm.value).subscribe({
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
      console.log(this.signUpForm);
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }
}
