import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MembershipOffer } from '../../../../data/interfaces/MembershipOffer';
import { MembershipOfferType } from './MembershipOfferType';

@Component({
  selector: 'app-membership-offer',
  templateUrl: './membership-offer.component.html',
  styleUrls: ['./membership-offer.component.css'],
})
export class MembershipOfferComponent implements OnInit {
  @Output() onClick: EventEmitter<null> = new EventEmitter();
  @Input() offer: MembershipOffer = new MembershipOffer();
  @Input() type: MembershipOfferType;
  @Input() selected: boolean = false;
  @Input() hideAction: boolean = false;

  constructor() {
    this.type = MembershipOfferType.User;
  }

  getMembershipOfferType(): typeof MembershipOfferType {
    return MembershipOfferType;
  }

  ngOnInit(): void {}

  action() {
    this.onClick.emit();
  }
}
