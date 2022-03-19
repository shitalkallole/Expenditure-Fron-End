import { TestBed } from '@angular/core/testing';

import { CategoryApiCallService } from './category-api-call.service';

describe('CategoryApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryApiCallService = TestBed.get(CategoryApiCallService);
    expect(service).toBeTruthy();
  });
});
