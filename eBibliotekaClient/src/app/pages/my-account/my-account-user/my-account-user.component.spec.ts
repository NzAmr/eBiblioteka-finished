import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountUserComponent } from './my-account-user.component';

describe('MyAccountUserComponent', () => {
  let component: MyAccountUserComponent;
  let fixture: ComponentFixture<MyAccountUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
