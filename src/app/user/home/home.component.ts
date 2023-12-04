import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { AdminDoctorService } from 'src/app/admin/admin-doctor.service';
import { Doctor } from 'src/app/shared/interfaces/doctor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  doctorSubscription: Subscription | undefined = undefined;
  doctorList: Doctor[] = [];
  images = [
    '../../../assets/image1.jpg',
    '../../../assets/image2.jpg',
    '../../../assets/image3.jpg',
    '../../../assets/image4.jpg'
  ];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  constructor(private adminService: AdminDoctorService) {}

  ngOnInit(): void {
    this.doctorSubscription = this.adminService.getDoctors().subscribe({
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
