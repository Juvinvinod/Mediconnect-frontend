import { Component, OnInit, OnDestroy } from '@angular/core';
import { Staff } from 'src/app/shared/interfaces/staff';
import { AdminStaffService } from '../admin-staff.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditStaffPopupComponent } from '../edit-staff-popup/edit-staff-popup.component';
import { AddStaffPopupComponent } from '../add-staff-popup/add-staff-popup.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffsComponent implements OnInit, OnDestroy {
  staffSubscription: Subscription | undefined = undefined;
  blockStaffSubscription: Subscription | undefined = undefined;
  unblockStaffSubscription: Subscription | undefined = undefined;
  staffData!: Staff;
  tableData: Staff[] = [];
  tableColumns: { name: string; header: string }[] = [
    { name: 'index', header: 'SL.No' },
    { name: 'first_name', header: 'First name' },
    { name: 'last_name', header: 'Last name' },
    { name: 'email', header: 'Email' },
    { name: 'mobile', header: 'Mobile' },
    { name: 'actions', header: 'Actions' }
  ];

  constructor(
    private staffService: AdminStaffService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.staffSubscription = this.staffService.getStaffs().subscribe({
      next: (res: Staff[]) => {
        this.tableData = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editDoctor(event: Staff) {
    this.staffData = event;
    this.openPopup();
  }

  blockUser(event: Staff) {
    if (event._id) {
      this.blockStaffSubscription = this.staffService
        .blockStaff(event._id)
        .subscribe({
          next: (res: { success: string }) => {
            this.loadData();

            this.snackBar.open(res.success, 'Dismiss', {
              duration: 5000
            });
          }
        });
    }
  }

  unBlockUser(event: Staff) {
    if (event._id) {
      this.unblockStaffSubscription = this.staffService
        .unBlockStaff(event._id)
        .subscribe({
          next: (res) => {
            this.loadData();
            this.snackBar.open(res.success, 'Dismiss', {
              duration: 5000
            });
          }
        });
    }
  }

  addStaff() {
    this.openAddStaff();
  }

  openPopup() {
    const dialogRef = this.dialog.open(EditStaffPopupComponent, {
      width: '60%',
      height: '400px',
      data: {
        _id: this.staffData._id,
        first_name: this.staffData.first_name,
        last_name: this.staffData.last_name,
        mobile: this.staffData.mobile,
        email: this.staffData.email
      }
    });

    // Subscribe to the userUpdated event from EditUserPopupComponent
    dialogRef.componentInstance.userUpdated.subscribe(() => {
      // Refresh your table data here
      this.loadData();
    });
  }

  openAddStaff() {
    const dialogRef = this.dialog.open(AddStaffPopupComponent, {
      width: '60%',
      height: '600px'
    });
    // Subscribe to the userUpdated event from EditUserPopupComponent
    dialogRef.componentInstance.userUpdated.subscribe(() => {
      // Refresh your table data here
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    if (this.staffSubscription) {
      this.staffSubscription.unsubscribe();
    }

    if (this.blockStaffSubscription) {
      this.blockStaffSubscription.unsubscribe();
    }

    if (this.unblockStaffSubscription) {
      this.unblockStaffSubscription.unsubscribe();
    }
  }
}
