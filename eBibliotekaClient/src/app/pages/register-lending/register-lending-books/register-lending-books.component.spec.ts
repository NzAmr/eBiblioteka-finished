import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLendingBooksComponent } from './register-lending-books.component';

describe('RegisterLendingBooksComponent', () => {
  let component: RegisterLendingBooksComponent;
  let fixture: ComponentFixture<RegisterLendingBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLendingBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLendingBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
