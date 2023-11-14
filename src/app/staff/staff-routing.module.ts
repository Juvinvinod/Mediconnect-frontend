import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { StaffHomeComponent } from './staff-home/staff-home.component';
import { staffCheckGuard } from '../guards/staff-check.guard';
import { StaffPatientsComponent } from './staff-patients/staff-patients.component';

const routes: Routes = [
  { path: 'staff/login', component: StaffLoginComponent },
  {
    path: 'staff',
    component: StaffHomeComponent,
    canActivate: [staffCheckGuard],
    canActivateChild: [staffCheckGuard],
    children: [{ path: '', component: StaffPatientsComponent }]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {}
