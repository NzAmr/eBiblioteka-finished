import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesAuthComponent } from './series-auth.component';

describe('SeriesAuthComponent', () => {
  let component: SeriesAuthComponent;
  let fixture: ComponentFixture<SeriesAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
