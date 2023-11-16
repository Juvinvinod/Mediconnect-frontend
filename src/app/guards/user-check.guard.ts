import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';

export const userCheckGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router: Router = inject(Router);
  const isFlagEnabled = userService.userLoggedIn();
  return isFlagEnabled || router.createUrlTree(['login']);
};
