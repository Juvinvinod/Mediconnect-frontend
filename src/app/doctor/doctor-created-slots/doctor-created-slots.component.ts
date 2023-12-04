import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Slot } from 'src/app/shared/interfaces/slot';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-created-slots',
  templateUrl: './doctor-created-slots.component.html',
  styleUrls: ['./doctor-created-slots.component.css']
})
export class DoctorCreatedSlotsComponent implements OnInit, OnDestroy {
  getSlotSubscription: Subscription | undefined = undefined;
  deleteSlotSubscription: Subscription | undefined = undefined;
  dataSource: any;
  displayedColumns: string[] = [
    'index',
    'date',
    'start_time',
    'end_time',
    'actions'
  ];
  constructor(
    private doctorService: DoctorService,
    private snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.getSlotSubscription = this.doctorService.getDocSlots().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<Slot>(res);
        this.changeDetectorRefs.detectChanges();
      }
    });
  }

  cancelSlot(data: Slot) {
    const time = data.start_time;
    this.deleteSlotSubscription = this.doctorService
      .deleteSlot(time)
      .subscribe({
        next: (res) => {
          // this.refresh();
          this.snackBar.open(res.success, 'Dismiss', {
            duration: 5000
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.getSlotSubscription) {
      this.getSlotSubscription.unsubscribe();
    }
    if (this.deleteSlotSubscription) {
      this.deleteSlotSubscription.unsubscribe();
    }
  }
}
