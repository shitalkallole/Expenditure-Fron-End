import { TestBed } from '@angular/core/testing';

import { PersonalExpenseApiCallService } from './personal-expense-api-call.service';

describe('PersonalExpenseApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonalExpenseApiCallService = TestBed.get(PersonalExpenseApiCallService);
    expect(service).toBeTruthy();
  });
});
