import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { Slot } from 'src/app/shared/interfaces/slot';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit, AfterViewInit {
  dataSource!: any;
  data: Slot[] = [];
  displayedColumns: string[] = ['index', 'date', 'status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService: UserService) {
    this.loadData();
  }

  ngOnInit(): void {
    this.userService.getBookingDocs().subscribe({
      next: (res) => {
        this.data = res;
        console.log(this.data);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.userService.getBookingDocs().subscribe({
      next: (res) => {
        this.data = res;
        this.dataSource = new MatTableDataSource<Slot>(this.data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
