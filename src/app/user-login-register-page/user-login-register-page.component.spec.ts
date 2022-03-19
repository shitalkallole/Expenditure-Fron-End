import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginRegisterPageComponent } from './user-login-register-page.component';

describe('UserLoginRegisterPageComponent', () => {
  let component: UserLoginRegisterPageComponent;
  let fixture: ComponentFixture<UserLoginRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginRegisterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
