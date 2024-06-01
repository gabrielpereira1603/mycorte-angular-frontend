import { TestBed } from '@angular/core/testing';

import { FindByCompanyService } from './find-by-company.service';

describe('FindByCompanyService', () => {
  let service: FindByCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindByCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
