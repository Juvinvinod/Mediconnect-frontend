import { Component, OnInit, OnDestroy } from '@angular/core';
import { Slot } from 'src/app/shared/interfaces/slot';
import { DoctorService } from '../doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit, OnDestroy {
  doctorSubscription: Subscription | undefined = undefined;
  dataSource!: MatTableDataSource<Slot>;
  displayedColumns: string[] = [
    'index',
    'first_name',
    'mobile',
    'start_time',
    'end_time',
    'actions'
  ];
  constructor(
    private doctorService: DoctorService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.doctorSubscription = this.doctorService
      .getDoctorBookingDocs()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<Slot>(res);
        }
      });
  }

  details(row: Slot) {
    this._router.navigate(['prescription', row._id], {
      relativeTo: this.route
    });
  }

  ngOnDestroy(): void {
    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }
  }
}
