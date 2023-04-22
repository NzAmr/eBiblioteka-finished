import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsBooksComponent } from './member-details-books.component';

describe('MemberDetailsBooksComponent', () => {
  let component: MemberDetailsBooksComponent;
  let fixture: ComponentFixture<MemberDetailsBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDetailsBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
