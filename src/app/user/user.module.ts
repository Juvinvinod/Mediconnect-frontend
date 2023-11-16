import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserOutletComponent } from './user-outlet/user-outlet.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserPasswordComponent } from './user-password/user-password.component';

@NgModule({
  declarations: [
    SignupComponent,
    HomeComponent,
    LoginComponent,
    UserProfileComponent,
    UserOutletComponent,
    UserFooterComponent,
    UserPasswordComponent
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
