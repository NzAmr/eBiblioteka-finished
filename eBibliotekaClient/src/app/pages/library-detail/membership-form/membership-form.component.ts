import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MembershipService } from '../../../core/http/membership.service';
import { Library, UserLibraryVM } from '../../../data/interfaces/Library';
import { MembershipOffer } from '../../../data/interfaces/MembershipOffer';

@Component({
  selector: 'app-membership-form',
  templateUrl: './membership-form.component.html',
  styleUrls: ['./membership-form.component.css'],
})
export class MembershipFormComponent implements OnInit {
  @Output() onClose: EventEmitter<null> = new EventEmitter<null>();
  @Input() offer: MembershipOffer = new MembershipOffer();
  @Input() library: UserLibraryVM = new UserLibraryVM();

  loading: boolean = false;

  constructor(private membershipService: MembershipService) {}

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
  }

  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');
    this.onClose.emit();
  }

  getScrollPos() {
    return window.scrollY;
  }

  submit() {
    this.loading = true;

    console.log(this.offer);

    this.membershipService.joinLibrary(this.offer.id).subscribe(
      (res) => {
        this.loading = false;
        location.reload();
        this.closeOverlay();
      },
      (err) => {
        this.loading = false;
        alert('Došlo je do greške!');
      }
    );
  }
}
