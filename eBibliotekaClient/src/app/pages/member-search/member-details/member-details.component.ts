import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../../../core/http/book.service';
import { MembershipService } from '../../../core/http/membership.service';
import {
  MemberDetailsVM,
  Membership,
} from '../../../data/interfaces/Membership';
import { createImgPath } from '../../../helpers/CreateImgPath';
import { MemberDetailsTab } from './MemberDetailsTab';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: [
    './member-details.component.css',
    '../member-list/member-list.component.css',
  ],
})
export class MemberDetailsComponent implements OnInit {
  @Input() userID: number = -1;
  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();
  tab: MemberDetailsTab;
  member: MemberDetailsVM = new MemberDetailsVM();

  constructor(
    private membershipService: MembershipService,
    private bookService: BookService
  ) {
    this.tab = MemberDetailsTab.AboutMember;
  }

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling');

    this.loadMemberDetails();
  }

  getFullImagePath(path: string): string {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }

  getScrollPos() {
    return window.scrollY;
  }

  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');
    this.onCloseOverlay.emit();
  }

  public get getTab(): typeof MemberDetailsTab {
    return MemberDetailsTab;
  }

  setTab(tab: MemberDetailsTab) {
    this.tab = tab;
  }

  registerReturn(id: number) {
    this.bookService.registerReturn(id).subscribe(
      (res) => {
        alert('Uspjeh');

        console.log(this.member.lentBooks);

        this.member.lentBooks = this.member.lentBooks.filter(
          (lb) => lb.id !== id
        );
        console.log(this.member.lentBooks);
      },
      (err) => {
        alert('Došlo je do greške pri evidentiranju vraćanja knjige!');
      }
    );
  }

  onRegisterPayment(member: Membership) {
    this.loadMemberDetails();
  }

  loadMemberDetails() {
    this.membershipService.getMemberDetails(this.userID).subscribe(
      (res) => {
        this.member = res;
        this.tab = MemberDetailsTab.AboutMember;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
