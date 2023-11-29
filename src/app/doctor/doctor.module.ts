import { NgModule } from '@angular/core';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { SharedModule } from '../shared/shared.module';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { RouterModule } from '@angular/router';
import { DoctorPatientsComponent } from './doctor-patients/doctor-patients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorPasswordComponent } from './doctor-password/doctor-password.component';
import { DoctorSlotComponent } from './doctor-slot/doctor-slot.component';
import { DoctorCreatedSlotsComponent } from './doctor-created-slots/doctor-created-slots.component';
import { DoctorChatComponent } from './doctor-chat/doctor-chat.component';

@NgModule({
  declarations: [
    DoctorLoginComponent,
    DoctorHomeComponent,
    DoctorPatientsComponent,
    DoctorAppointmentsComponent,
    DoctorProfileComponent,
    DoctorPasswordComponent,
    DoctorSlotComponent,
    DoctorCreatedSlotsComponent,
    DoctorChatComponent
  ],
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class DoctorModule {}
