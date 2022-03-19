import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendBorrowExpenseComponent } from './lend-borrow-expense.component';

describe('LendBorrowExpenseComponent', () => {
  let component: LendBorrowExpenseComponent;
  let fixture: ComponentFixture<LendBorrowExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendBorrowExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendBorrowExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
