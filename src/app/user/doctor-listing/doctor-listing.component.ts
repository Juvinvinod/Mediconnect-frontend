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
  searchValue = '';
  doctorList: Doctor[] = [];
  constructor(private adminService: AdminDoctorService) {}
  ngOnInit(): void {
    this.adminService.getDoctors().subscribe({
      next: (res) => {
        this.doctorList = res;
      }
    });
    window.scrollTo(0, 0);
  }

  trackById(index: number, doctor: Doctor) {
    return doctor._id;
  }
}
