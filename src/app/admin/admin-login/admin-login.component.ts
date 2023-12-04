import { Component, ViewChild, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnDestroy {
  loginSubscription: Subscription | undefined = undefined;
  @ViewChild(LoginComponent) loginComponent: LoginComponent | null = null;
  constructor(
    private adminService: AdminService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.loginComponent) {
      console.log('hi');

      const formData = this.loginComponent.loginForm.value;
      this.loginSubscription = this.adminService
        .adminLogin(formData)
        .subscribe({
          next: (res) => {
            console.log('loggedIn');
            localStorage.setItem('user', JSON.stringify(res));
            this._router.navigate(['/admin']);
          },
          error: (error) => {
            this.snackBar.open(error.error.errors[0].message, 'Dismiss', {
              duration: 2000
            });
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
