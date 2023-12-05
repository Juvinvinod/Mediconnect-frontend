import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Slot } from 'src/app/shared/interfaces/slot';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit, OnDestroy {
  bookingSubscription: Subscription | undefined = undefined;
  data: Slot[] = [];
  constructor(
    private userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.bookingSubscription = this.userService.getBookingDocs().subscribe({
      next: (res) => {
        this.data = res;
        console.log(this.data);
      }
    });
  }

  trackById(index: number, document: Slot) {
    return document._id;
  }

  viewDetails(event: Slot) {
    this._router.navigate(['/appointment', event._id]);
  }

  ngOnDestroy(): void {
    if (this.bookingSubscription) {
      this.bookingSubscription.unsubscribe();
    }
  }
}
