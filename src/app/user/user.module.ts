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
    UserChatComponent
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
