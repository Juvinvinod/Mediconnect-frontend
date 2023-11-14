import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { staffCheckGuard } from './staff-check.guard';

describe('staffCheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => staffCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
