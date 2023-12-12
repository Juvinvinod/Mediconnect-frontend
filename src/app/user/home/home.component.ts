import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { AdminDoctorService } from 'src/app/admin/admin-doctor.service';
import { Doctor } from 'src/app/shared/interfaces/doctor';
import { Subscription } from 'rxjs';
import { Dept } from 'src/app/shared/interfaces/department';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  doctorSubscription: Subscription | undefined = undefined;
  deptSubscription: Subscription | undefined = undefined;
  doctorList: Doctor[] = [];
  departments: Dept[] = [];
  images = [
    '../../../assets/image1.webp',
    '../../../assets/image-2.webp',
    '../../../assets/image-3.webp'
  ];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  constructor(
    private adminDoctorService: AdminDoctorService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.doctorSubscription = this.adminService.getDepartments().subscribe({
      next: (res) => {
        this.departments = res;
        console.log(this.departments);
      }
    });
    this.doctorSubscription = this.adminDoctorService.getDoctors().subscribe({
      next: (res) => {
        this.doctorList = res;
      }
    });
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
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
