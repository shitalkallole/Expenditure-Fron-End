import { TestBed } from '@angular/core/testing';

import { LendBorrowExpenseApiCallService } from './lend-borrow-expense-api-call.service';

describe('LendBorrowExpenseApiCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LendBorrowExpenseApiCallService = TestBed.get(LendBorrowExpenseApiCallService);
    expect(service).toBeTruthy();
  });
});
