import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookToSeriesComponent } from './add-book-to-series.component';

describe('AddBookToSeriesComponent', () => {
  let component: AddBookToSeriesComponent;
  let fixture: ComponentFixture<AddBookToSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookToSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookToSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
