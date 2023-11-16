import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { statusCheckerGuard } from './guards/status-checker.guard';

//these routes are allowed for public
const routes: Routes = [
  {
    path: 'login',
    canActivate: [statusCheckerGuard],
    component: LoginComponent
  },
  {
    path: 'signup',
    canActivate: [statusCheckerGuard],
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
