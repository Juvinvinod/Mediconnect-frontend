import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DoctorsComponent } from './doctors/doctors.component';
import { StaffsComponent } from './staffs/staffs.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    DoctorsComponent,
    StaffsComponent,
    UsersComponent
  ],
  imports: [SharedModule, RouterModule, AdminRoutingModule]
})
export class AdminModule {}
