import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DoctorsComponent } from './doctors/doctors.component';
import { StaffsComponent } from './staffs/staffs.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EditUserPopupComponent } from './edit-user-popup/edit-user-popup.component';
import { EditDoctorPopupComponent } from './edit-doctor-popup/edit-doctor-popup.component';
import { AddDoctorPopupComponent } from './add-doctor-popup/add-doctor-popup.component';
import { AddStaffPopupComponent } from './add-staff-popup/add-staff-popup.component';
import { EditStaffPopupComponent } from './edit-staff-popup/edit-staff-popup.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AddDeptPopupComponent } from './add-dept-popup/add-dept-popup.component';
import { EditDeptPopupComponent } from './edit-dept-popup/edit-dept-popup.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    DoctorsComponent,
    StaffsComponent,
    UsersComponent,
    AdminLoginComponent,
    EditUserPopupComponent,
    EditDoctorPopupComponent,
    AddDoctorPopupComponent,
    AddStaffPopupComponent,
    EditStaffPopupComponent,
    DepartmentsComponent,
    AddDeptPopupComponent,
    EditDeptPopupComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {}
