import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { DoctorService } from '../doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Slot } from 'src/app/shared/interfaces/slot';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-doctor-created-slots',
  templateUrl: './doctor-created-slots.component.html',
  styleUrls: ['./doctor-created-slots.component.css']
})
export class DoctorCreatedSlotsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getSlotSubscription: Subscription | undefined = undefined;
  deleteSlotSubscription: Subscription | undefined = undefined;
  dataSource!: MatTableDataSource<Slot>;
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refresh() {
    this.getSlotSubscription = this.doctorService.getDocSlots().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<Slot>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
          // Find the index of the slot to be deleted
          const index = this.dataSource.data.findIndex(
            (slot: Slot) => slot.start_time === time
          );

          // Remove the slot from the dataSource.data
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);

            // Update the MatTableDataSource to reflect the changes
            this.dataSource = new MatTableDataSource<Slot>(
              this.dataSource.data
            );

            // Inform Angular about the changes
            this.changeDetectorRefs.detectChanges();
          }

          this.snackBar.open(res.success, 'Dismiss', {
            duration: 5000
          });
        }
      });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
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
