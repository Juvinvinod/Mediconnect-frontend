import { CanActivateFn, Router } from '@angular/router';
import { DoctorService } from '../doctor/doctor.service';
import { inject } from '@angular/core';

export const doctorCheckGuard: CanActivateFn = (route, state) => {
  const doctorService = inject(DoctorService);
  const router: Router = inject(Router);
  const isFlagEnabled = doctorService.doctorLoggedIn();
  return isFlagEnabled || router.createUrlTree(['login']);
};
