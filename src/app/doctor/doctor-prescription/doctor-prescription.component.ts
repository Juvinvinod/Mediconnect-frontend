import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { Slot } from 'src/app/shared/interfaces/slot';

@Component({
  selector: 'app-doctor-prescription',
  templateUrl: './doctor-prescription.component.html',
  styleUrls: ['./doctor-prescription.component.css']
})
export class DoctorPrescriptionComponent implements OnInit {
  slotForm!: FormGroup;
  slotId = '';
  slotDetails: Slot[] = [];
  paramsSubscription: Subscription | undefined = undefined;
  slotSubscription: Subscription | undefined = undefined;
  doctorSubscription: Subscription | undefined = undefined;
  constructor(
    private doctorService: DoctorService,
    private userService: UserService,
    private _router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.slotId = params['id'];
    });
    this.slotSubscription = this.userService
      .getSlotData(this.slotId)
      .subscribe({
        next: (res) => {
          this.slotDetails = res;
        }
      });
    this.slotForm = new FormGroup({
      prescription: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.slotForm.valid) {
      this.slotForm.addControl(
        'user_id',
        new FormControl(this.slotDetails[0]?._id, Validators.required)
      );
      console.log(this.slotForm.value);

      this.doctorSubscription = this.doctorService
        .updateSlots(this.slotForm.value)
        .subscribe({
          next: () => {
            this._router.navigate(['../../'], {
              relativeTo: this.route
            });
            this.snackBar.open('Successfully updated', 'Dismiss', {
              duration: 5000
            });
          }
        });
    } else {
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }
}
