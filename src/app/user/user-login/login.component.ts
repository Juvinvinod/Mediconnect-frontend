import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from 'src/app/shared/login/login.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class UserLoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  @ViewChild(LoginComponent) loginComponent: LoginComponent | null = null;

  constructor(
    private userService: UserService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginComponent) {
      const formData = this.loginComponent.loginForm.value;
      this.userService.userLogin(formData).subscribe({
        next: (res) => {
          console.log('loggedIn');
          localStorage.setItem('user', JSON.stringify(res));
          this._router.navigate(['']);
        },
        error: (error) => {
          this.snackBar.open(error.error.errors[0].message, 'Dismiss', {
            duration: 2000
          });
        }
      });
    } else {
      this.snackBar.open('Invalid credentials', 'Dismiss', { duration: 2000 });
    }
  }
}
