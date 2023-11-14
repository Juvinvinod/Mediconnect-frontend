import { CanActivateFn, Router } from '@angular/router';
import { StaffService } from '../staff/staff.service';
import { inject } from '@angular/core';

export const staffCheckGuard: CanActivateFn = (route, state) => {
  const staffService = inject(StaffService);
  const router: Router = inject(Router);
  const isFlagEnabled = staffService.staffLoggedIn();
  return isFlagEnabled || router.createUrlTree(['login']);
};
