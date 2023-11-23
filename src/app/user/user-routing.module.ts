import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { userCheckGuard } from '../guards/user-check.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOutletComponent } from './user-outlet/user-outlet.component';
import { HomeComponent } from './home/home.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import { DoctorBookingComponent } from './doctor-booking/doctor-booking.component';
import { DoctorListingComponent } from './doctor-listing/doctor-listing.component';
import { UserAppointmentsComponent } from './user-appointments/user-appointments.component';
import { UserLoginComponent } from './user-login/login.component';
import { statusCheckerGuard } from '../guards/status-checker.guard';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: '',
    component: UserOutletComponent,
    children: [
      {
        path: 'profile',
        canActivate: [userCheckGuard],
        component: UserProfileComponent
      },
      {
        path: 'password',
        canActivate: [userCheckGuard],
        component: UserPasswordComponent
      },
      {
        path: 'booking/:id',
        canActivate: [userCheckGuard],
        component: DoctorBookingComponent
      },
      {
        path: 'allDoctors',
        canActivate: [userCheckGuard],
        component: DoctorListingComponent
      },
      {
        path: 'appointments',
        canActivate: [userCheckGuard],
        component: UserAppointmentsComponent
      },
      { path: '', pathMatch: 'full', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
