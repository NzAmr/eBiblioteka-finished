import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSeriesFormComponent } from './books-series-form.component';

describe('BooksSeriesFormComponent', () => {
  let component: BooksSeriesFormComponent;
  let fixture: ComponentFixture<BooksSeriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksSeriesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksSeriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
