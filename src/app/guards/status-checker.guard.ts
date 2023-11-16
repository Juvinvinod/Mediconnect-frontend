import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

export const statusCheckerGuard: CanActivateFn = (route, state) => {
  const sharedService = inject(SharedService);
  const router = inject(Router);
  const isFlagEnabled = sharedService.tokenChecker();
  return isFlagEnabled || router.createUrlTree(['']);
};
