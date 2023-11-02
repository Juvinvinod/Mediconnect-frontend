import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HeaderComponent, LoginComponent],
  imports: [CommonModule, MaterialModule, NgbCollapseModule, NgbDropdownModule],
  exports: [
    HeaderComponent,
    CommonModule,
    MaterialModule,
    NgbCollapseModule,
    NgbDropdownModule
  ]
})
export class SharedModule {}
