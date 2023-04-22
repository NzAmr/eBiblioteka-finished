import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageLibrarianComponent } from './landing-page-librarian.component';

describe('LandingPageLibrarianComponent', () => {
  let component: LandingPageLibrarianComponent;
  let fixture: ComponentFixture<LandingPageLibrarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageLibrarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
