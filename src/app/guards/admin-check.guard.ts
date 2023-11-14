import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';

export const adminCheckGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router: Router = inject(Router);
  const isFlagEnabled = adminService.adminLoggedIn();
  return isFlagEnabled || router.createUrlTree(['login']);
};
