import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Slot } from 'src/app/shared/interfaces/slot';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-created-slots',
  templateUrl: './doctor-created-slots.component.html',
  styleUrls: ['./doctor-created-slots.component.css']
})
export class DoctorCreatedSlotsComponent implements OnInit {
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
    this.doctorService.getDocSlots().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<Slot>(res);
        this.changeDetectorRefs.detectChanges();
      }
    });
  }

  cancelSlot(data: Slot) {
    const time = data.start_time;
    this.doctorService.deleteSlot(time).subscribe({
      next: (res) => {
        this.refresh();
        this.snackBar.open(res.success, 'Dismiss', {
          duration: 5000
        });
      }
    });
  }
}
