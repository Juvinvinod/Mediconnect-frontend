import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { doctorCheckGuard } from '../guards/doctor-check.guard';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { DoctorPasswordComponent } from './doctor-password/doctor-password.component';
import { statusCheckerGuard } from '../guards/status-checker.guard';

const routes: Routes = [
  {
    path: 'doctor/login',
    canActivate: [statusCheckerGuard],
    component: DoctorLoginComponent
  },
  {
    path: 'doctor',
    canActivate: [doctorCheckGuard],
    canActivateChild: [doctorCheckGuard],
    component: DoctorHomeComponent,
    children: [
      { path: 'profile', component: DoctorProfileComponent },
      { path: 'password', component: DoctorPasswordComponent },
      { path: '', component: DoctorAppointmentsComponent }
    ]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {}
