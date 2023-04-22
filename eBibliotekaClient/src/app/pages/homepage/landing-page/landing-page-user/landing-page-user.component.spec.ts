import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageUserComponent } from './landing-page-user.component';

describe('LandingPageUserComponent', () => {
  let component: LandingPageUserComponent;
  let fixture: ComponentFixture<LandingPageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
