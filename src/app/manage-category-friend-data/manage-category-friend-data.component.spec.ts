import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryFriendDataComponent } from './manage-category-friend-data.component';

describe('ManageCategoryFriendDataComponent', () => {
  let component: ManageCategoryFriendDataComponent;
  let fixture: ComponentFixture<ManageCategoryFriendDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCategoryFriendDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCategoryFriendDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
