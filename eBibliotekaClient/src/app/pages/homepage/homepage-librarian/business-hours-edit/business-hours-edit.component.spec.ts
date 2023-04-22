import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHoursEditComponent } from './business-hours-edit.component';

describe('BusinessHoursEditComponent', () => {
  let component: BusinessHoursEditComponent;
  let fixture: ComponentFixture<BusinessHoursEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessHoursEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHoursEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
