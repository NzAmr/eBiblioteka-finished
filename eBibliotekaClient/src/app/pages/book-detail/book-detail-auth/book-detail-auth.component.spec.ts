import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailAuthComponent } from './book-detail-auth.component';

describe('BookDetailAuthComponent', () => {
  let component: BookDetailAuthComponent;
  let fixture: ComponentFixture<BookDetailAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
