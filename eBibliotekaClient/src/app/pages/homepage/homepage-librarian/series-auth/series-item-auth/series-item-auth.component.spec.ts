import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesItemAuthComponent } from './series-item-auth.component';

describe('SeriesItemAuthComponent', () => {
  let component: SeriesItemAuthComponent;
  let fixture: ComponentFixture<SeriesItemAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesItemAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesItemAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
