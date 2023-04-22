import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsAboutComponent } from './member-details-about.component';

describe('MemberDetailsAboutComponent', () => {
  let component: MemberDetailsAboutComponent;
  let fixture: ComponentFixture<MemberDetailsAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDetailsAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
