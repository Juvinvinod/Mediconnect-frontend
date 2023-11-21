import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Doctor } from 'src/app/shared/interfaces/doctor';
import { Slot } from 'src/app/shared/interfaces/slot';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.css']
})
export class DoctorBookingComponent implements OnInit {
  selectedDate: Date | null = null;
  doctorId = '';
  doctorDetails: Doctor | null = null;
  slotDetails: Slot[] | null = null;
  selectedTime: string | null = '';
  timeSlots: any;
  timeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Get the 'id' parameter from the route
    this.route.params.subscribe((params) => {
      this.doctorId = params['id'];
    });
    this.userService.getDoctor(this.doctorId).subscribe((res) => {
      this.doctorDetails = res;
    });
    this.userService.getSlots(this.doctorId).subscribe((res) => {
      this.slotDetails = res;
      console.log(this.slotDetails);
    });
    this.timeForm = new FormGroup({
      time: new FormControl('', Validators.required),
      date: new FormControl('')
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value;
    this.slotDetails = this.getSlotsForSelectedDate();
    this.timeForm.patchValue({ date: this.selectedDate });
    console.log(this.slotDetails);

    console.log(this.selectedDate);
  }

  getSlotsForSelectedDate(): any {
    if (!this.selectedDate || !this.slotDetails) {
      return [];
    }

    const formattedSelectedDate = this.datePipe.transform(
      this.selectedDate,
      'yyyy-MM-dd'
    );

    return this.slotDetails
      .filter(
        (slot) =>
          this.datePipe.transform(slot.date, 'yyyy-MM-dd') ===
          formattedSelectedDate
      )
      .map((slot) => ({
        start_time: this.datePipe.transform(slot.start_time, 'hh:mm a'),
        end_time: this.datePipe.transform(slot.end_time, 'hh:mm a')
      }));
  }

  onSubmit() {
    if (this.timeForm.valid) {
      this.userService.bookSlot(this.timeForm.value, this.doctorId).subscribe({
        next: (res) => {
          this.snackBar.open(res.success, 'Dismiss', {
            duration: 5000
          });
        }
      });
    }
    console.log(this.timeForm.value);
  }
}
