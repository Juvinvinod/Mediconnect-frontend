import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ForgotpassEmailComponent } from 'src/app/shared/forgotpass-email/forgotpass-email.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-forgot-pass-email',
  templateUrl: './user-forgot-pass-email.component.html',
  styleUrls: ['./user-forgot-pass-email.component.css']
})
export class UserForgotPassEmailComponent implements OnDestroy {
  @ViewChild(ForgotpassEmailComponent)
  emailComponent: ForgotpassEmailComponent | null = null;
  emailSubscription: Subscription | undefined = undefined;

  constructor(
    private userService: UserService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    console.log('hi');
    if (this.emailComponent) {
      const formData = this.emailComponent.loginForm.value;
      this.emailSubscription = this.userService.emailCheck(formData).subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res.success);
            this._router.navigate(['../emailsend']);
          }
        }
      });
    } else {
      this.snackBar.open('Invalid credentials', 'Dismiss', { duration: 2000 });
    }
  }

  ngOnDestroy(): void {
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe();
    }
  }
}
