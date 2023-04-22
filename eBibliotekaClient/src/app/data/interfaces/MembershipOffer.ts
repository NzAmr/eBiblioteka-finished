export class MembershipOffer {
  id: number;
  title: string;
  description: string;
  price: number;
  addedMonths: number;
  noOfBooks: number;
  active: boolean;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.title = 'Ucitavanje...';
    this.description = 'Ucitavanje...';
    this.price = -1;
    this.addedMonths = -1;
    this.noOfBooks = -1;
    this.active = false;
  }
}

export class MembershipOfferCreateVM {
  title: string;
  description: string;
  price: number;
  addedMonths: number;
  noOfBooks: number;

  /**
   *
   */
  constructor() {
    this.title = '';
    this.description = '';
    this.price = 1;
    this.addedMonths = 1;
    this.noOfBooks = 1;
  }
}

export class MembershipOfferUpdateVM {
  title: string;
  description: string;
  price: number;
  addedMonths: number;
  noOfBooks: number;
  active: boolean;

  /**
   *
   */
  constructor() {
    this.title = 'Ucitavanje...';
    this.description = 'Ucitavanje...';
    this.price = -1;
    this.addedMonths = -1;
    this.noOfBooks = -1;
    this.active = false;
  }
}
