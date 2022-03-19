import { TestBed } from '@angular/core/testing';

import { FriendApiCallService } from './friend-api-call.service';

describe('FriendApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendApiCallService = TestBed.get(FriendApiCallService);
    expect(service).toBeTruthy();
  });
});
