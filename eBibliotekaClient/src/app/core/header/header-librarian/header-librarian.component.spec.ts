import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLibrarianComponent } from './header-librarian.component';

describe('HeaderLibrarianComponent', () => {
  let component: HeaderLibrarianComponent;
  let fixture: ComponentFixture<HeaderLibrarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderLibrarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
