import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTagAuthComponent } from './book-tag-auth.component';

describe('BookTagAuthComponent', () => {
  let component: BookTagAuthComponent;
  let fixture: ComponentFixture<BookTagAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTagAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTagAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
