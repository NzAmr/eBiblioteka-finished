import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesBookItemComponent } from './series-book-item.component';

describe('SeriesBookItemComponent', () => {
  let component: SeriesBookItemComponent;
  let fixture: ComponentFixture<SeriesBookItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesBookItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesBookItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
