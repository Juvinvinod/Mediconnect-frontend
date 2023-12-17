import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewPasswordComponent } from 'src/app/shared/new-password/new-password.component';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-new-password',
  templateUrl: './user-new-password.component.html',
  styleUrls: ['./user-new-password.component.css']
})
export class UserNewPasswordComponent implements OnInit {
  paramsSubscription: Subscription | undefined = undefined;
  passSubscription: Subscription | undefined = undefined;
  passwordForm!: FormGroup;
  token = '';
  @ViewChild(NewPasswordComponent)
  NewPasswordComponent: NewPasswordComponent | null = null;

  constructor(
    private userService: UserService,
    private _router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  // Get the 'id' parameter from the route
  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (this.NewPasswordComponent) {
      const formData = this.NewPasswordComponent.passwordForm.value;
      this.passSubscription = this.userService
        .resetPassword(formData, this.token)
        .subscribe({
          next: () => {
            this._router.navigate(['../login']);
            this.snackBar.open('Password Successfully changed', 'Dismiss', {
              duration: 2000
            });
          }
        });
    } else {
      this.snackBar.open('Invalid credentials', 'Dismiss', { duration: 2000 });
    }
  }
}
