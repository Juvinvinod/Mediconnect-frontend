import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, LoginComponent, TableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    MaterialModule,
    NgbCollapseModule,
    NgbDropdownModule,
    LoginComponent
  ]
})
export class SharedModule {}
