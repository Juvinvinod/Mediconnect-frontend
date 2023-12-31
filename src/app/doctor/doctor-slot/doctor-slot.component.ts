import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-slot',
  templateUrl: './doctor-slot.component.html',
  styleUrls: ['./doctor-slot.component.css']
})
export class DoctorSlotComponent implements OnInit, OnDestroy {
  slotSubscription: Subscription | undefined = undefined;
  slotForm!: FormGroup;
  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(
    private doctorService: DoctorService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.slotForm = new FormGroup({
      start_time: new FormControl('', Validators.required),
      end_time: new FormControl('', Validators.required),
      date: new FormControl(null, Validators.required)
    });
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.slotForm.valid) {
      this.slotSubscription = this.doctorService
        .createSlot(this.slotForm.value)
        .subscribe({
          next: (res) => {
            this.slotForm.reset();
            formDirective.resetForm();
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

  ngOnDestroy(): void {
    if (this.slotSubscription) {
      this.slotSubscription.unsubscribe();
    }
  }
}
