import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUserLibrariesComponent } from './homepage-user-libraries.component';

describe('HomepageUserLibrariesComponent', () => {
  let component: HomepageUserLibrariesComponent;
  let fixture: ComponentFixture<HomepageUserLibrariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageUserLibrariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageUserLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
