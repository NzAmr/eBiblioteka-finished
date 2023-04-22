import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLendingUsersComponent } from './register-lending-users.component';

describe('RegisterLendingUsersComponent', () => {
  let component: RegisterLendingUsersComponent;
  let fixture: ComponentFixture<RegisterLendingUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLendingUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLendingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
