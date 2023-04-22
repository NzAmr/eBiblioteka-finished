import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountLibrarianComponent } from './my-account-librarian.component';

describe('MyAccountLibrarianComponent', () => {
  let component: MyAccountLibrarianComponent;
  let fixture: ComponentFixture<MyAccountLibrarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountLibrarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
