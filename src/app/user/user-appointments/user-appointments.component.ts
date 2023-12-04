import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Slot } from 'src/app/shared/interfaces/slot';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit {
  data: Slot[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getBookingDocs().subscribe({
      next: (res) => {
        this.data = res;
        console.log(this.data);
      }
    });
  }

  trackById(index: number, document: Slot) {
    return document._id;
  }
}
