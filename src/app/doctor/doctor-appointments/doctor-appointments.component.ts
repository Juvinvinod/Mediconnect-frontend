import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { Slot } from 'src/app/shared/interfaces/slot';
import { DoctorService } from '../doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  doctorSubscription: Subscription | undefined = undefined;
  dataSource!: MatTableDataSource<Slot>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  details(row: Slot) {
    this._router.navigate(['prescription', row._id], {
      relativeTo: this.route
    });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  ngOnDestroy(): void {
    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }
  }
}
