import { Component, OnInit, OnChanges } from '@angular/core';
import { SharedService } from '../shared.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  isCollapsed = true;
  isUserLoggedIn = true;
  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.userCheck();
  }

  ngOnChanges() {
    this.isUserLoggedIn = this.userCheck();
  }

  collapse() {
    this.sharedService.collapse();
    this.isCollapsed = this.sharedService.isCollapsed;
  }

  userCheck() {
    return this.userService.userLoggedIn();
  }

  logOut() {
    localStorage.removeItem('user');
    this.isUserLoggedIn = false;
    this.router.navigate(['/']);
  }
}
