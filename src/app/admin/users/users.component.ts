import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { User } from 'src/app/user/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { EditUserPopupComponent } from '../edit-user-popup/edit-user-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | undefined = undefined;
  userData!: User;
  tableData: User[] = [];
  tableColumns: { name: string; header: string }[] = [
    { name: 'index', header: 'SL.No' },
    { name: 'first_name', header: 'First name' },
    { name: 'last_name', header: 'Last name' },
    { name: 'email', header: 'Email' },
    { name: 'mobile', header: 'Mobile' },
    { name: 'actions', header: 'Actions' }
  ];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userSubscription = this.adminService.getUsers().subscribe({
      next: (res: User[]) => {
        this.tableData = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editUser(event: User) {
    this.userData = event;
    this.openPopup();
  }

  blockUser(event: User) {
    if (event._id) {
      this.adminService.blockUser(event._id).subscribe({
        next: (res) => {
          this.loadData();
          this.snackBar.open(res.success, 'Dismiss', {
            duration: 5000
          });
        }
      });
    }
  }

  unBlockUser(event: User) {
    if (event._id) {
      this.adminService.unBlockUser(event._id).subscribe({
        next: (res) => {
          this.loadData();
          this.snackBar.open(res.success, 'Dismiss', {
            duration: 5000
          });
        }
      });
    }
  }

  openPopup() {
    const dialogRef = this.dialog.open(EditUserPopupComponent, {
      width: '60%',
      height: '400px',
      data: {
        _id: this.userData._id,
        first_name: this.userData.first_name,
        last_name: this.userData.last_name,
        mobile: this.userData.mobile,
        email: this.userData.email
      }
    });

    // Subscribe to the userUpdated event from EditUserPopupComponent
    dialogRef.componentInstance.userUpdated.subscribe(() => {
      // Refresh your table data here
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
