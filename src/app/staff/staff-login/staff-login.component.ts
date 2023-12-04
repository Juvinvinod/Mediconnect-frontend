import { Component, ViewChild, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { StaffService } from '../staff.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent implements OnDestroy {
  loginSubscription: Subscription | undefined = undefined;
  @ViewChild(LoginComponent) loginComponent: LoginComponent | null = null;
  constructor(
    private staffService: StaffService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.loginComponent) {
      const formData = this.loginComponent.loginForm.value;
      this.loginSubscription = this.staffService
        .staffLogin(formData)
        .subscribe({
          next: (res) => {
            console.log('loggedIn');
            localStorage.setItem('user', JSON.stringify(res));
            this._router.navigate(['/staff']);
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
