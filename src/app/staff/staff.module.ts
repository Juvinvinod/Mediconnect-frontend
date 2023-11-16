import { NgModule } from '@angular/core';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { StaffPatientsComponent } from './staff-patients/staff-patients.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { StaffPasswordComponent } from './staff-password/staff-password.component';

@NgModule({
  declarations: [
    StaffLoginComponent,
    StaffHomeComponent,
    StaffPatientsComponent,
    StaffProfileComponent,
    StaffPasswordComponent
  ],
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class StaffModule {}
