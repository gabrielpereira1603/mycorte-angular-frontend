import { TestBed } from '@angular/core/testing';

import { SessionClientService } from './session-client.service';

describe('SessionClientService', () => {
  let service: SessionClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
