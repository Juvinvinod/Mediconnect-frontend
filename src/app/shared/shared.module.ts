import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ForgotpassEmailComponent } from './forgotpass-email/forgotpass-email.component';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    TableComponent,
    ErrorComponent,
    ForgotpassEmailComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    MaterialModule,
    NgbCollapseModule,
    NgbDropdownModule,
    LoginComponent,
    TableComponent,
    ForgotpassEmailComponent,
    NewPasswordComponent
  ]
})
export class SharedModule {}
