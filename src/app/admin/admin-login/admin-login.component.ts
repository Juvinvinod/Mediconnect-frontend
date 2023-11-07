import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from 'src/app/shared/login/login.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  @ViewChild(LoginComponent) loginComponent: LoginComponent | null = null;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.loginComponent) {
      console.log('hi');

      const formData = this.loginComponent.loginForm.value;
      this.adminService.adminLogin(formData).subscribe({
        next: (res) => {
          console.log('loggedIn');
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/admin']);
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
