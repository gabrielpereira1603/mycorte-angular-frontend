import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { companyExistsGuard } from './company-exists.guard';

describe('companyExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => companyExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
