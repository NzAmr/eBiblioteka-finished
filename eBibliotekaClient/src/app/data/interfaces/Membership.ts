import { LentBookDetailedListVM } from './Book';
import { MembershipOffer } from './MembershipOffer';
import { PaymentListVM } from './Payment';

export class Membership {
  debt: number;
  active: boolean;
  expirationDate: Date;
  membershipOffer: MembershipOffer;

  /**
   *
   */
  constructor() {
    this.debt = 0;
    this.active = false;
    this.expirationDate = new Date();
    this.membershipOffer = new MembershipOffer();
  }
}

export class MemberListVM {
  id: number;
  userID:number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  joinDate: Date;
  expirationDate: Date;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.userID = -1;
    this.email = 'Učitavanje...';
    this.username = 'Učitavanje...';
    this.firstName = 'Učitavanje...';
    this.lastName = 'Učitavanje...';
    this.profileImage = 'Učitavanje...';
    this.joinDate = new Date();
    this.expirationDate = new Date();
  }
}

export class MemberDetailsVM {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  joinDate: Date;
  expirationDate: Date;
  noOfLentBooks: number;
  membershipOffer: MembershipOffer;
  lentBooks: LentBookDetailedListVM[];
  payments: PaymentListVM[];

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.email = 'Učitavanje...';
    this.username = 'Učitavanje...';
    this.firstName = 'Učitavanje...';
    this.lastName = 'Učitavanje...';
    this.profileImage = 'Učitavanje...';
    this.joinDate = new Date();
    this.expirationDate = new Date();
    this.noOfLentBooks = -1;
    this.membershipOffer = new MembershipOffer();
    this.lentBooks = [];
    this.payments = [];
  }
}
