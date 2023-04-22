import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTagUserComponent } from './book-tag-user.component';

describe('BookTagUserComponent', () => {
  let component: BookTagUserComponent;
  let fixture: ComponentFixture<BookTagUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTagUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTagUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
