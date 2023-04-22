import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTagItemComponent } from './book-tag-item.component';

describe('BookTagItemComponent', () => {
  let component: BookTagItemComponent;
  let fixture: ComponentFixture<BookTagItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTagItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTagItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
