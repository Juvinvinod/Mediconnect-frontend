import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Doctor } from 'src/app/shared/interfaces/doctor';
import { Slot } from 'src/app/shared/interfaces/slot';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';

declare let Razorpay: any;

@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.css']
})
export class DoctorBookingComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription | undefined = undefined;
  doctorSubscription: Subscription | undefined = undefined;
  slotSubscription: Subscription | undefined = undefined;
  bookingSubscription: Subscription | undefined = undefined;
  profileSubscription: Subscription | undefined = undefined;
  selectedDate: Date | null = null;
  doctorId = '';
  doctorDetails: Doctor | null = null;
  slotDetails: Slot[] | null = null;
  unfilteredData: Slot[] | null = null;
  selectedTime: string | null = '';
  timeSlots!: string;
  timeForm!: FormGroup;
  formData: any;
  userDetails: User | null = null;
  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit() {
    // Get the 'id' parameter from the route
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.doctorId = params['id'];
    });
    this.doctorSubscription = this.userService
      .getDoctor(this.doctorId)
      .subscribe((res) => {
        this.doctorDetails = res;
      });
    this.slotSubscription = this.userService
      .getSlots(this.doctorId)
      .subscribe((res) => {
        this.slotDetails = res;
        this.unfilteredData = res;
      });
    this.timeForm = new FormGroup({
      time: new FormControl('', Validators.required),
      date: new FormControl('')
    });
    this.profileSubscription = this.userService
      .getUserProfile()
      .subscribe((res) => {
        this.userDetails = res;
      });
    window.scrollTo(0, 0);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value;
    this.slotDetails = this.unfilteredData;
    this.slotDetails = this.getSlotsForSelectedDate();
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
        booking_id: slot._id,
        start_time: this.datePipe.transform(slot.start_time, 'hh:mm a'),
        end_time: this.datePipe.transform(slot.end_time, 'hh:mm a')
      }));
  }

  // onSubmit() {
  //   // this.timeForm.patchValue({ date: this.selectedDate });
  //   // if (this.timeForm.valid) {
  //   //   this.payNow();
  //   // }
  //   if (this.timeForm.valid && this.selectedDate) {
  //     const formattedDate = this.datePipe.transform(
  //       this.selectedDate,
  //       'yyyy-MM-ddTHH:mm:ss.SSSZ'
  //     );
  //     this.timeForm.patchValue({ date: formattedDate });
  //     this.payNow();
  //   }
  // }

  onSubmit() {
    if (this.timeForm.valid) {
      const selectedSlot = this.slotDetails?.find(
        (slot: Slot) => slot.start_time === this.timeForm.value.time
      );

      if (selectedSlot) {
        this.formData = selectedSlot;
        this.payNow();
      } else {
        console.error('Selected slot not found.');
      }
    }
  }

  payNow() {
    const razorpayOptions = {
      description: 'Sample razorpay',
      currency: 'INR',
      amount: Number(this.doctorDetails?.doctor_fees) * 100,
      name: 'MEDICONNECT',
      key: 'rzp_test_ceFacoW5d4WL7R',
      prefill: {
        name: this.userDetails?.first_name,
        email: this.userDetails?.email,
        phone: this.userDetails?.mobile
      },
      handler: function (response: any) {
        if (response.error) {
          failureCallback(response);
        } else {
          console.log(response);
          successCallback(response.razorpay_payment_id);
        }
      },
      theme: {
        color: '#f37254'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    };

    const successCallback = (payId: string) => {
      this.formData.doctorId = this.doctorId;
      this.formData.payId = payId;

      this.bookingSubscription = this.userService
        .bookSlot(this.formData)
        .subscribe({
          next: (res) => {
            this._router.navigate(['/appointments']);
            this.snackBar.open(res.success, 'Dismiss', {
              duration: 5000
            });
          }
        });
    };

    const failureCallback = (e: any) => {
      console.log(e);
    };
    const rzp1 = new Razorpay(razorpayOptions);
    rzp1.open();
  }

  trackById(index: number, slot: Slot) {
    return slot._id;
  }

  ngOnDestroy(): void {
    if (this.bookingSubscription) {
      this.bookingSubscription.unsubscribe();
    }
    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.slotSubscription) {
      this.slotSubscription.unsubscribe();
    }
  }
}
