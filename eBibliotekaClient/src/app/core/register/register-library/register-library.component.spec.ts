import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLibraryComponent } from './register-library.component';

describe('RegisterLibraryComponent', () => {
  let component: RegisterLibraryComponent;
  let fixture: ComponentFixture<RegisterLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
