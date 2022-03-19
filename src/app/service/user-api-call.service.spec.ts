import { TestBed } from '@angular/core/testing';

import { UserApiCallService } from './user-api-call.service';

describe('UserApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserApiCallService = TestBed.get(UserApiCallService);
    expect(service).toBeTruthy();
  });
});
