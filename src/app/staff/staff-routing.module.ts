import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { staffCheckGuard } from '../guards/staff-check.guard';
import { StaffPatientsComponent } from './staff-patients/staff-patients.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { StaffPasswordComponent } from './staff-password/staff-password.component';

const routes: Routes = [
  {
    path: 'staff/login',
    component: StaffLoginComponent
  },
  {
    path: 'staff',
    component: StaffHomeComponent,
    canActivate: [staffCheckGuard],
    canActivateChild: [staffCheckGuard],
    children: [
      { path: 'password', component: StaffPasswordComponent },
      { path: 'profile', component: StaffProfileComponent },
      { path: '', component: StaffPatientsComponent }
    ]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {}
