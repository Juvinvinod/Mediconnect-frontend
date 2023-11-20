import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-slot',
  templateUrl: './doctor-slot.component.html',
  styleUrls: ['./doctor-slot.component.css']
})
export class DoctorSlotComponent implements OnInit {
  slotForm!: FormGroup;
  constructor(
    private doctorService: DoctorService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.slotForm = new FormGroup({
      start_time: new FormControl('', Validators.required),
      end_time: new FormControl('', Validators.required),
      date: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.slotForm.valid) {
      this.slotForm.reset();
      this.doctorService.createSlot(this.slotForm.value).subscribe({
        next: (res) => {
          this.snackBar.open(res.success, 'Dismiss', {
            duration: 5000
          });
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
