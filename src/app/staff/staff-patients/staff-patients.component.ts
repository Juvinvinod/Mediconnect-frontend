import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/admin/admin.service';
import { User } from 'src/app/user/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staff-patients',
  templateUrl: './staff-patients.component.html',
  styleUrls: ['./staff-patients.component.css']
})
export class StaffPatientsComponent implements AfterViewInit, OnDestroy {
  userSubscription: Subscription | undefined = undefined;
  displayedColumns: string[] = [
    'index',
    'first_name',
    'last_name',
    'email',
    'mobile'
  ];
  dataSource!: MatTableDataSource<User>;
  userList: User[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService) {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.userSubscription = this.adminService.getUsers().subscribe({
      next: (res: User[]) => {
        this.userList = res;
        this.dataSource = new MatTableDataSource<User>(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
