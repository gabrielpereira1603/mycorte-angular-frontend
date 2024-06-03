import { TestBed } from '@angular/core/testing';

import { AllCollaboratorService } from './all-collaborator.service';

describe('AllCollaboratorService', () => {
  let service: AllCollaboratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCollaboratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
