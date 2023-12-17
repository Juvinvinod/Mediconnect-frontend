import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  hide = true;
  passwordForm!: FormGroup;
  @Output() formDetails = new EventEmitter<void>();
  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.formDetails.emit();
    } else {
      console.log('error');
    }
  }
}
