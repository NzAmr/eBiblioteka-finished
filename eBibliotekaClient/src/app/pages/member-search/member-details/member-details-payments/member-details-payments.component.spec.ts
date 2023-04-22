import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsPaymentsComponent } from './member-details-payments.component';

describe('MemberDetailsPaymentsComponent', () => {
  let component: MemberDetailsPaymentsComponent;
  let fixture: ComponentFixture<MemberDetailsPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDetailsPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
