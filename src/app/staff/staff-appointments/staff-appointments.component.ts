import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-staff-appointments',
  templateUrl: './staff-appointments.component.html',
  styleUrls: ['./staff-appointments.component.css']
})
export class StaffAppointmentsComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getBookedSlotDocs().subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }
}
