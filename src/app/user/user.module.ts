import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupComponent, HomeComponent],
  imports: [SharedModule, FormsModule, ReactiveFormsModule]
})
export class UserModule {}
