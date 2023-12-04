import { Component, OnInit, OnDestroy } from '@angular/core';
import { Slot } from 'src/app/shared/interfaces/slot';
import { DoctorService } from '../doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit, OnDestroy {
  doctorSubscription: Subscription | undefined = undefined;
  dataSource: any;
  form: { user_id: string | undefined; status: string } = {
    user_id: '',
    status: ''
  };
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
    private snackBar: MatSnackBar
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

  completed(data: Slot) {
    this.form.status = 'completed';
    this.form.user_id = data._id;
    this.doctorService.updateSlots(this.form).subscribe({
      next: () => {
        this.snackBar.open('Successfully updated', 'Dismiss', {
          duration: 5000
        });
      }
    });
  }

  incomplete(data: Slot) {
    this.form.status = 'incomplete';
    this.form.user_id = data._id;
    this.doctorService.updateSlots(this.form).subscribe({
      next: () => {
        this.snackBar.open('Successfully updated', 'Dismiss', {
          duration: 5000
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }
  }
}
