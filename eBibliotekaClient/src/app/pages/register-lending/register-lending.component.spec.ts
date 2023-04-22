import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLendingComponent } from './register-lending.component';

describe('RegisterLendingComponent', () => {
  let component: RegisterLendingComponent;
  let fixture: ComponentFixture<RegisterLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
