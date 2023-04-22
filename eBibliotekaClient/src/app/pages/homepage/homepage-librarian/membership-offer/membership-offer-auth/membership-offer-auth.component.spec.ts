import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipOfferAuthComponent } from './membership-offer-auth.component';

describe('MembershipOfferAuthComponent', () => {
  let component: MembershipOfferAuthComponent;
  let fixture: ComponentFixture<MembershipOfferAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipOfferAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipOfferAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
