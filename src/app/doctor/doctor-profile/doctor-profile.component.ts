import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { Doctor } from 'src/app/shared/interfaces/doctor';
import { AdminDoctorService } from 'src/app/admin/admin-doctor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit, OnDestroy {
  doctorSubscription: Subscription | undefined = undefined;
  updateSubscription: Subscription | undefined = undefined;
  signUpForm!: FormGroup;
  doctorData: Doctor | undefined = undefined;

  constructor(
    private doctorService: DoctorService,
    private adminDoctorService: AdminDoctorService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  // initializing reactive form when the component loads
  ngOnInit(): void {
    this.initializeForm();
    this.doctorSubscription = this.doctorService.getDoctorProfile().subscribe({
      next: (res) => {
        this.doctorData = res;
        this.initializeForm();
      }
    });
  }

  initializeForm(): void {
    this.signUpForm = new FormGroup({
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
    this.signUpForm.controls['email'].disable();
  }

  //check for errors and update doctor in the database
  onSubmit() {
    const id = this.doctorData?._id;
    if (id && this.signUpForm.valid) {
      this.updateSubscription = this.adminDoctorService
        .updateDoctor(id, this.signUpForm.value)
        .subscribe({
          next: () => {
            this._router.navigate(['doctor']);
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
    this._router.navigate(['/doctor/password']);
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }
  }
}
