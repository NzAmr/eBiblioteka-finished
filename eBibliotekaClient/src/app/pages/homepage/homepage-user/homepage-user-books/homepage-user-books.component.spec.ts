import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUserBooksComponent } from './homepage-user-books.component';

describe('HomepageUserBooksComponent', () => {
  let component: HomepageUserBooksComponent;
  let fixture: ComponentFixture<HomepageUserBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageUserBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageUserBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
