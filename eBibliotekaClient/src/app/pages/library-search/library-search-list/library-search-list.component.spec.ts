import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarySearchListComponent } from './library-search-list.component';

describe('LibrarySearchListComponent', () => {
  let component: LibrarySearchListComponent;
  let fixture: ComponentFixture<LibrarySearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarySearchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarySearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
