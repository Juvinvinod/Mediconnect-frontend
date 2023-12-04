import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from 'src/app/shared/interfaces/doctor';
import { AdminDoctorService } from '../admin-doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDoctorPopupComponent } from '../edit-doctor-popup/edit-doctor-popup.component';
import { AddDoctorPopupComponent } from '../add-doctor-popup/add-doctor-popup.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {
  doctorSubscription: Subscription | undefined = undefined;
  doctorData!: Doctor;
  tableData: Doctor[] = [];
  tableColumns: { name: string; header: string }[] = [
    { name: 'index', header: 'SL.No' },
    { name: 'first_name', header: 'First name' },
    { name: 'last_name', header: 'Last name' },
    { name: 'email', header: 'Email' },
    { name: 'mobile', header: 'Mobile' },
    { name: 'department', header: 'Department' },
    { name: 'doctor_fees', header: 'Doctor Fees' },
    { name: 'actions', header: 'Actions' }
  ];

  constructor(
    private doctorService: AdminDoctorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.doctorSubscription = this.doctorService.getDoctors().subscribe({
      next: (res: Doctor[]) => {
        this.tableData = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editDoctor(event: Doctor) {
    this.doctorData = event;
    this.openPopup();
  }

  blockUser(event: Doctor) {
    if (event._id) {
      this.doctorService.blockDoctor(event._id).subscribe({
        next: (res: { success: string }) => {
          this.loadData();

          this.snackBar.open(res.success, 'Dismiss', {
            duration: 5000
          });
        }
      });
    }
  }

  unBlockUser(event: Doctor) {
    if (event._id) {
      this.doctorService.unBlockDoctor(event._id).subscribe({
        next: (res) => {
          this.loadData();
          this.snackBar.open(res.success, 'Dismiss', {
            duration: 5000
          });
        }
      });
    }
  }

  addDoctor() {
    this.openAddDoctor();
  }

  openPopup() {
    const dialogRef = this.dialog.open(EditDoctorPopupComponent, {
      width: '60%',
      height: '400px',
      data: {
        _id: this.doctorData._id,
        first_name: this.doctorData.first_name,
        last_name: this.doctorData.last_name,
        mobile: this.doctorData.mobile,
        email: this.doctorData.email
      }
    });

    // Subscribe to the userUpdated event from EditUserPopupComponent
    dialogRef.componentInstance.userUpdated.subscribe(() => {
      // Refresh your table data here
      this.loadData();
    });
  }

  openAddDoctor() {
    const dialogRef = this.dialog.open(AddDoctorPopupComponent, {
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
    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }
  }
}
