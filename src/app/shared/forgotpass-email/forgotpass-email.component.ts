import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpass-email',
  templateUrl: './forgotpass-email.component.html',
  styleUrls: ['./forgotpass-email.component.css']
})
export class ForgotpassEmailComponent implements OnInit {
  loginForm!: FormGroup;
  @Output() formDetails = new EventEmitter<void>();
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.formDetails.emit();
    } else {
      console.log('error');
    }
  }
}
