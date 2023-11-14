import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  @ViewChild(LoginComponent) loginComponent: LoginComponent | null = null;
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.loginComponent) {
      const formData = this.loginComponent.loginForm.value;
      this.doctorService.doctorLogin(formData).subscribe({
        next: (res) => {
          console.log('loggedIn');
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/doctor']);
        },
        error: (error) => {
          console.log(error);

          this.snackBar.open(error.error.errors[0].message, 'Dismiss', {
            duration: 2000
          });
        }
      });
    }
  }
}
