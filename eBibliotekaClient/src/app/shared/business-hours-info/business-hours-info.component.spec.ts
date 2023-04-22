import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHoursInfoComponent } from './business-hours-info.component';

describe('BusinessHoursInfoComponent', () => {
  let component: BusinessHoursInfoComponent;
  let fixture: ComponentFixture<BusinessHoursInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessHoursInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHoursInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
