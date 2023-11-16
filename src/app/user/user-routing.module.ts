import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { userCheckGuard } from '../guards/user-check.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOutletComponent } from './user-outlet/user-outlet.component';
import { HomeComponent } from './home/home.component';
import { UserPasswordComponent } from './user-password/user-password.component';

const routes: Routes = [
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
      { path: '', pathMatch: 'full', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
