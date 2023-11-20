import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { Dept } from 'src/app/shared/interfaces/department';
import { AddDeptPopupComponent } from '../add-dept-popup/add-dept-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements AfterViewInit {
  deptList: Dept[] = [];
  displayedColumns: string[] = ['index', 'dept_name'];
  dataSource!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.adminService.getDepartments().subscribe({
      next: (res: Dept[]) => {
        this.deptList = res;
        this.dataSource = new MatTableDataSource<Dept>(this.deptList);
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

  addDept() {
    this.openAddDept();
  }

  openAddDept() {
    const dialogRef = this.dialog.open(AddDeptPopupComponent, {
      width: '60%',
      height: '600px'
    });
    // Subscribe to the userUpdated event from EditUserPopupComponent
    dialogRef.componentInstance.deptAdded.subscribe(() => {
      // Refresh your table data here
      this.loadData();
    });
  }
}
