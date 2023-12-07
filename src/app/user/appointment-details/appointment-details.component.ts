import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Slot } from 'src/app/shared/interfaces/slot';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  paramsSubscription: Subscription | undefined = undefined;
  slotSubscription: Subscription | undefined = undefined;
  cancelSlotSubscription: Subscription | undefined = undefined;
  slotId = '';
  slotDetails!: Slot[];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.slotId = params['id'];
    });
    this.slotSubscription = this.userService
      .getSlotData(this.slotId)
      .subscribe({
        next: (res) => {
          this.slotDetails = res;
        }
      });
  }

  cancelBooking() {
    this.cancelSlotSubscription = this.userService
      .cancelSlot(this.slotId)
      .subscribe({
        next: (res) => {
          this.snackBar.open(res.success, 'Dismiss', {
            duration: 5000
          });
          this._router.navigate(['../../appointments']);
        }
      });
  }
}
