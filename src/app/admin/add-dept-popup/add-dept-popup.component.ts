import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-dept-popup',
  templateUrl: './add-dept-popup.component.html',
  styleUrls: ['./add-dept-popup.component.css']
})
export class AddDeptPopupComponent implements OnInit, OnDestroy {
  selectedFileName: string | null = null;
  addDepartmentSubscription: Subscription | undefined = undefined;
  hide = true;
  file!: File;
  deptForm!: FormGroup;
  @Output() deptAdded: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private ref: MatDialogRef<AddDeptPopupComponent>,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.deptForm = new FormGroup({
      dept_name: new FormControl('', Validators.required),
      image: new FormControl(null, Validators.required)
    });
  }

  onImageChange(event: any) {
    console.log(event);

    this.file = <File>event.target.files[0];
    this.selectedFileName = this.file ? this.file.name : null;
    console.log(this.selectedFileName);
  }

  onSubmit() {
    if (this.deptForm.valid) {
      console.log(this.deptForm.value);
      const formData = new FormData();
      formData.append('dept_name', this.deptForm.get('dept_name')?.value);
      formData.append('file', this.file);
      this.addDepartmentSubscription = this.adminService
        .addDepartment(formData)
        .subscribe({
          next: () => {
            this.ref.close();
            this.snackBar.open('Successfully added', 'Dismiss', {
              duration: 5000
            });
            this.deptAdded.emit();
          }
        });
    } else {
      this.snackBar.open('Invalid Data', 'Dismiss', { duration: 2000 });
    }
  }

  ngOnDestroy(): void {
    if (this.addDepartmentSubscription) {
      this.addDepartmentSubscription.unsubscribe();
    }
  }
}
