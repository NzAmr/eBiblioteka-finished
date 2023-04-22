import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipOfferCreateComponent } from './membership-offer-create.component';

describe('MembershipOfferCreateComponent', () => {
  let component: MembershipOfferCreateComponent;
  let fixture: ComponentFixture<MembershipOfferCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipOfferCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipOfferCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
