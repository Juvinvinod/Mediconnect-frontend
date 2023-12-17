import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOutletComponent } from './user-outlet/user-outlet.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import { DoctorListingComponent } from './doctor-listing/doctor-listing.component';
import { DoctorBookingComponent } from './doctor-booking/doctor-booking.component';
import { UserAppointmentsComponent } from './user-appointments/user-appointments.component';
import { UserLoginComponent } from './user-login/login.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { UserForgotPassEmailComponent } from './user-forgot-pass-email/user-forgot-pass-email.component';
import { UserNewPasswordComponent } from './user-new-password/user-new-password.component';
import { UserEmailSendComponent } from './user-email-send/user-email-send.component';

@NgModule({
  declarations: [
    SignupComponent,
    HomeComponent,
    UserLoginComponent,
    UserProfileComponent,
    UserOutletComponent,
    UserFooterComponent,
    UserPasswordComponent,
    DoctorListingComponent,
    DoctorBookingComponent,
    UserAppointmentsComponent,
    UserChatComponent,
    AppointmentDetailsComponent,
    UserForgotPassEmailComponent,
    UserNewPasswordComponent,
    UserEmailSendComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbCarouselModule
  ]
})
export class UserModule {}
