import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { StaffsComponent } from './staffs/staffs.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { adminCheckGuard } from '../guards/admin-check.guard';
import { DepartmentsComponent } from './departments/departments.component';

const routes: Routes = [
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [adminCheckGuard],
    canActivateChild: [adminCheckGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'staffs', component: StaffsComponent },
      { path: 'department', component: DepartmentsComponent }
    ]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
