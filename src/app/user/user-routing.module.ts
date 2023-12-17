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
import { UserChatComponent } from './user-chat/user-chat.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { statusCheckerGuard } from '../guards/status-checker.guard';
import { UserForgotPassEmailComponent } from './user-forgot-pass-email/user-forgot-pass-email.component';
import { UserNewPasswordComponent } from './user-new-password/user-new-password.component';
import { UserEmailSendComponent } from './user-email-send/user-email-send.component';

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
        path: 'emailsend',
        component: UserEmailSendComponent
      },
      {
        path: 'profile',
        canActivate: [userCheckGuard],
        component: UserProfileComponent
      },
      {
        path: 'newpassword/:token',
        component: UserNewPasswordComponent
      },
      {
        path: 'forgotPassword',
        canActivate: [statusCheckerGuard],
        component: UserForgotPassEmailComponent
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
        component: DoctorListingComponent
      },
      {
        path: 'appointments',
        canActivate: [userCheckGuard],
        component: UserAppointmentsComponent
      },
      {
        path: 'chats/:id',
        canActivate: [userCheckGuard],
        component: UserChatComponent
      },
      {
        path: 'appointment/:id',
        canActivate: [userCheckGuard],
        component: AppointmentDetailsComponent
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
