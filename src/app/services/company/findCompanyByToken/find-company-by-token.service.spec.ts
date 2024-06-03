import { TestBed } from '@angular/core/testing';

import { FindCompanyByTokenService } from './find-company-by-token.service';

describe('FindCompanyByTokenService', () => {
  let service: FindCompanyByTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCompanyByTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
