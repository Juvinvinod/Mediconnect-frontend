import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent {
  @ViewChild(LoginComponent) loginComponent: LoginComponent | null = null;
  constructor(
    private staffService: StaffService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.loginComponent) {
      console.log('hi');

      const formData = this.loginComponent.loginForm.value;
      this.staffService.staffLogin(formData).subscribe({
        next: (res) => {
          console.log('loggedIn');
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/staff']);
        },
        error: (error) => {
          this.snackBar.open(error.error.errors[0].message, 'Dismiss', {
            duration: 2000
          });
        }
      });
    }
  }
}
