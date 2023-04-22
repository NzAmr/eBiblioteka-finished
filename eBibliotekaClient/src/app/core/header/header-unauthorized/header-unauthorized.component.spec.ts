import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUnauthorizedComponent } from './header-unauthorized.component';

describe('HeaderUnauthorizedComponent', () => {
  let component: HeaderUnauthorizedComponent;
  let fixture: ComponentFixture<HeaderUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUnauthorizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
