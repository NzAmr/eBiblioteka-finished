import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageHowLibrarianComponent } from './landing-page-how-librarian.component';

describe('LandingPageHowLibrarianComponent', () => {
  let component: LandingPageHowLibrarianComponent;
  let fixture: ComponentFixture<LandingPageHowLibrarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageHowLibrarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageHowLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
