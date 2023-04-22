import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsListItemComponent } from './authors-list-item.component';

describe('AuthorsListItemComponent', () => {
  let component: AuthorsListItemComponent;
  let fixture: ComponentFixture<AuthorsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
