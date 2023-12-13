import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminDoctorService } from 'src/app/admin/admin-doctor.service';
import { Doctor } from 'src/app/shared/interfaces/doctor';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { Dept } from 'src/app/shared/interfaces/department';

@Component({
  selector: 'app-doctor-listing',
  templateUrl: './doctor-listing.component.html',
  styleUrls: ['./doctor-listing.component.css']
})
export class DoctorListingComponent implements OnInit, OnDestroy {
  doctorSubscription: Subscription | undefined = undefined;
  deptSubscription: Subscription | undefined = undefined;
  searchValue = '';
  selectedDept = '';
  doctorList: Doctor[] = [];
  filteredDoctorList: Doctor[] = [];
  deptList: Dept[] = [];
  constructor(
    private adminDocService: AdminDoctorService,
    private adminService: AdminService
  ) {}
  ngOnInit(): void {
    this.doctorSubscription = this.adminDocService.getDoctors().subscribe({
      next: (res) => {
        this.doctorList = res;
        this.updateDoctors();
      }
    });
    this.deptSubscription = this.adminService.getDepartments().subscribe({
      next: (res) => {
        this.deptList = res;
      }
    });
    window.scrollTo(0, 0);
  }

  updateDoctors() {
    this.filteredDoctorList = this.doctorList.filter(
      (doctor) =>
        (this.searchValue === '' ||
          doctor.first_name
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())) &&
        (this.selectedDept === '' || doctor.department === this.selectedDept)
    );
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
