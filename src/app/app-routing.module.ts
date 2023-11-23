import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './user/signup/signup.component';
import { statusCheckerGuard } from './guards/status-checker.guard';
import { LoginComponent } from './shared/login/login.component';
import { UserLoginComponent } from './user/user-login/login.component';

//these routes are allowed for public
const routes: Routes = [
  // {
  //   path: 'login',
  //   canActivate: [statusCheckerGuard],
  //   component: LoginComponent
  // },
  {
    path: 'login',
    canActivate: [statusCheckerGuard],
    component: UserLoginComponent
  },
  {
    path: 'signup',
    canActivate: [statusCheckerGuard],
    component: SignupComponent
  }
  // { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
