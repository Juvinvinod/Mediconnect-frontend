import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-mail-verified',
  templateUrl: './user-mail-verified.component.html',
  styleUrls: ['./user-mail-verified.component.css']
})
export class UserMailVerifiedComponent implements OnInit, OnDestroy {
  id = '';
  userSubscription: Subscription | undefined = undefined;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['token'];
    });
    this.userSubscription = this.userService.verifyMail(this.id).subscribe({
      next: () => {
        this.snackBar.open('Successfully verified', 'Dismiss', {
          duration: 5000
        });
      },
      error: () => {
        this._router.navigate(['./login']);
        this.snackBar.open('Verification failed', 'Dismiss', {
          duration: 5000
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
