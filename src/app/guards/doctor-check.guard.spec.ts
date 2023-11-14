import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { doctorCheckGuard } from './doctor-check.guard';

describe('doctorCheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => doctorCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
