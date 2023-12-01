import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Slot } from 'src/app/shared/interfaces/slot';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
}
