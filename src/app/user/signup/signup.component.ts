import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  signUpForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  // initializing reactive form when the component loads
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  //check for errors and save the user in the database
  onSubmit() {
    this.userService.proceedRegister(this.signUpForm.value).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
