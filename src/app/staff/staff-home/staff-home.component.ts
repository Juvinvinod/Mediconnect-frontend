import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.css']
})
export class StaffHomeComponent {
  constructor(private router: Router) {}
  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['staff', 'login']);
  }
}
