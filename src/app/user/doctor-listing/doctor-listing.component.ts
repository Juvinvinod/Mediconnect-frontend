import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Slot } from 'src/app/shared/interfaces/slot';
import { AdminDoctorService } from 'src/app/admin/admin-doctor.service';
import { Doctor } from 'src/app/shared/interfaces/doctor';

@Component({
  selector: 'app-doctor-listing',
  templateUrl: './doctor-listing.component.html',
  styleUrls: ['./doctor-listing.component.css']
})
export class DoctorListingComponent implements OnInit {
  doctorList: Doctor[] = [];
  constructor(
    private userService: UserService,
    private adminService: AdminDoctorService
  ) {}
  ngOnInit(): void {
    this.adminService.getDoctors().subscribe({
      next: (res) => {
        this.doctorList = res;
      }
    });
  }
}