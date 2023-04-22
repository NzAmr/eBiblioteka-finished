import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageHowUserComponent } from './landing-page-how-user.component';

describe('LandingPageHowUserComponent', () => {
  let component: LandingPageHowUserComponent;
  let fixture: ComponentFixture<LandingPageHowUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageHowUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageHowUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
