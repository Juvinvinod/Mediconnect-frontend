import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminDoctorService } from 'src/app/admin/admin-doctor.service';
import { Doctor } from 'src/app/shared/interfaces/doctor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-listing',
  templateUrl: './doctor-listing.component.html',
  styleUrls: ['./doctor-listing.component.css']
})
export class DoctorListingComponent implements OnInit, OnDestroy {
  doctorSubscription: Subscription | undefined = undefined;
  searchValue = '';
  doctorList: Doctor[] = [];
  constructor(private adminService: AdminDoctorService) {}
  ngOnInit(): void {
    this.doctorSubscription = this.adminService.getDoctors().subscribe({
      next: (res) => {
        this.doctorList = res;
      }
    });
    window.scrollTo(0, 0);
  }

  trackById(index: number, doctor: Doctor) {
    return doctor._id;
  }

  ngOnDestroy(): void {
    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }
  }
}
