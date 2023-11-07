import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignupComponent, HomeComponent, LoginComponent],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class UserModule {}
