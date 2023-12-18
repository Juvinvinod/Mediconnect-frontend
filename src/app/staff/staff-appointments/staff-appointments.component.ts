import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Slot } from 'src/app/shared/interfaces/slot';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-staff-appointments',
  templateUrl: './staff-appointments.component.html',
  styleUrls: ['./staff-appointments.component.css']
})
export class StaffAppointmentsComponent implements OnInit {
  doctorSubscription: Subscription | undefined = undefined;
  dataSource!: MatTableDataSource<Slot>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'index',
    'first_name',
    'doctor_name',
    'email',
    'mobile',
    'start_time',
    'end_time'
  ];
  constructor(
    private staffService: StaffService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.doctorSubscription = this.staffService.getAllBookings().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource<Slot>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // ngOnInit(): void {
  //   this.adminService.getBookedSlotDocs().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     }
  //   });
  // }
}
