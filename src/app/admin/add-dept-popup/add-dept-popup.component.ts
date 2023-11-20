import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dept-popup',
  templateUrl: './add-dept-popup.component.html',
  styleUrls: ['./add-dept-popup.component.css']
})
export class AddDeptPopupComponent implements OnInit {
  hide = true;
  deptForm!: FormGroup;
  @Output() deptAdded: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private ref: MatDialogRef<AddDeptPopupComponent>,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.deptForm = new FormGroup({
      dept_name: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.deptForm.valid) {
      this.adminService.addDepartment(this.deptForm.value).subscribe({
        next: () => {
          this.ref.close();
          this.snackBar.open('Successfully added', 'Dismiss', {
            duration: 5000
          });
          this.deptAdded.emit();
        },
        error: (error) => {
          this.snackBar.open(error.error.errors[0].message, 'Dismiss', {
            duration: 2000
          });
        }
      });
    } else {
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }
}
