import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLendingSummaryComponent } from './register-lending-summary.component';

describe('RegisterLendingSummaryComponent', () => {
  let component: RegisterLendingSummaryComponent;
  let fixture: ComponentFixture<RegisterLendingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLendingSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLendingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
