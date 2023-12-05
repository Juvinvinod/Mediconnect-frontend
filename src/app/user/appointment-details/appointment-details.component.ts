import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Slot } from 'src/app/shared/interfaces/slot';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  paramsSubscription: Subscription | undefined = undefined;
  slotSubscription: Subscription | undefined = undefined;
  slotId = '';
  slotDetails!: Slot[];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
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
}
