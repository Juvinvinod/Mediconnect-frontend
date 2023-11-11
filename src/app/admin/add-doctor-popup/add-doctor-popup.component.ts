import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminDoctorService } from '../admin-doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-doctor-popup',
  templateUrl: './add-doctor-popup.component.html',
  styleUrls: ['./add-doctor-popup.component.css']
})
export class AddDoctorPopupComponent implements OnInit {
  hide = true;
  doctorForm!: FormGroup;
  @Output() userUpdated: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private ref: MatDialogRef<AddDoctorPopupComponent>,
    private doctorService: AdminDoctorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.doctorForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      doctor_fees: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ])
    });
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      this.doctorService.addDoctor(this.doctorForm.value).subscribe({
        next: () => {
          this.ref.close();
          this.snackBar.open('Successfully added', 'Dismiss', {
            duration: 5000
          });
          this.userUpdated.emit();
        },
        error: (error) => {
          this.snackBar.open(error.error.errors[0].message, 'Dismiss', {
            duration: 2000
          });
        }
      });
    } else {
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }
}
