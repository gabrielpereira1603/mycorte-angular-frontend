import { TestBed } from '@angular/core/testing';

import { FindCompanyByNameService } from './find-company-by-name.service';

describe('FindCompanyByNameService', () => {
  let service: FindCompanyByNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCompanyByNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
