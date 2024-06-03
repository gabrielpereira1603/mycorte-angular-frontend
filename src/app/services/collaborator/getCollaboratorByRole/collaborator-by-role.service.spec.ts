import { TestBed } from '@angular/core/testing';

import { CollaboratorByRoleService } from './collaborator-by-role.service';

describe('CollaboratorByRoleService', () => {
  let service: CollaboratorByRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaboratorByRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
