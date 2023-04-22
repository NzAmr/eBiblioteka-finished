import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarySearchMapComponent } from './library-search-map.component';

describe('LibrarySearchMapComponent', () => {
  let component: LibrarySearchMapComponent;
  let fixture: ComponentFixture<LibrarySearchMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarySearchMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarySearchMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
