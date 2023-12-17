import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { Dept } from 'src/app/shared/interfaces/department';
import { AddDeptPopupComponent } from '../add-dept-popup/add-dept-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditDeptPopupComponent } from '../edit-dept-popup/edit-dept-popup.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements AfterViewInit, OnDestroy {
  deptSubscription: Subscription | undefined = undefined;
  deptData: Dept = { dept_name: '', _id: '' };
  deptList: Dept[] = [];
  displayedColumns: string[] = ['index', 'dept_name', 'actions'];
  dataSource!: MatTableDataSource<Dept>;
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
    this.deptSubscription = this.adminService.getDepartments().subscribe({
      next: (res: Dept[]) => {
        this.deptList = res;
        this.dataSource = new MatTableDataSource<Dept>(this.deptList);
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

  addDept() {
    this.openAddDept();
  }

  openAddDept() {
    const dialogRef = this.dialog.open(AddDeptPopupComponent, {
      width: '50%',
      height: '280px'
    });
    // Subscribe to the userUpdated event from EditUserPopupComponent
    dialogRef.componentInstance.deptAdded.subscribe(() => {
      // Refresh your table data here
      this.loadData();
    });
  }

  editDept(row: Dept) {
    this.deptData._id = row._id;
    this.deptData.dept_name = row.dept_name;
    this.openEditDept();
  }

  openEditDept() {
    const dialogRef = this.dialog.open(EditDeptPopupComponent, {
      width: '50%',
      height: '250px',
      data: {
        _id: this.deptData._id,
        dept_name: this.deptData.dept_name
      }
    });
    // Subscribe to the userUpdated event from EditUserPopupComponent
    dialogRef.componentInstance.deptUpdated.subscribe(() => {
      // Refresh your table data here
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    if (this.deptSubscription) {
      this.deptSubscription.unsubscribe();
    }
  }
}
