import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAvailabilityAuthComponent } from './check-availability-auth.component';

describe('CheckAvailabilityAuthComponent', () => {
  let component: CheckAvailabilityAuthComponent;
  let fixture: ComponentFixture<CheckAvailabilityAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckAvailabilityAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAvailabilityAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
