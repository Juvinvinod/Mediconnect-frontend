import { NgModule } from '@angular/core';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffPatientsComponent } from './staff-patients/staff-patients.component';

@NgModule({
  declarations: [
    StaffLoginComponent,
    StaffHomeComponent,
    StaffPatientsComponent
  ],
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class StaffModule {}
