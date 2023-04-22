import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipOfferComponent } from './membership-offer.component';

describe('MembershipOfferComponent', () => {
  let component: MembershipOfferComponent;
  let fixture: ComponentFixture<MembershipOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
