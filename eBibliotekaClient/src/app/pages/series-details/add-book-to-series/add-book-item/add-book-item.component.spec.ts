import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookItemComponent } from './add-book-item.component';

describe('AddBookItemComponent', () => {
  let component: AddBookItemComponent;
  let fixture: ComponentFixture<AddBookItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
