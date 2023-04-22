import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLibrarianComponent } from './homepage-librarian.component';

describe('HomepageLibrarianComponent', () => {
  let component: HomepageLibrarianComponent;
  let fixture: ComponentFixture<HomepageLibrarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageLibrarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
