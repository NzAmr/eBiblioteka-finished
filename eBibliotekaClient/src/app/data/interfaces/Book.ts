import { Author } from './Author';
import { Image } from './Image';
import { MemberListVM } from './Membership';

export class Book {
  id: number;
  title: string;
  description: string;
  numberOfCopies: number;
  author: Author;
  coverImage?: Image;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.title = 'Učitavanje...';
    this.description = 'Učitavanje...';
    this.author = new Author();
    this.numberOfCopies = -1;
  }
}

export class BookDetailsVM {
  title: string;
  description: string;
  numberOfCopies: number;
  copiesRemaining: number;
  author: Author;
  coverImage?: Image;

  /**
   *
   */
  constructor() {
    this.title = 'Učitavanje...';
    this.description = 'Učitavanje...';
    this.author = new Author();
    this.numberOfCopies = -1;
    this.copiesRemaining = -1;
  }
}

export class BookAddVM {
  description: string;
  title: string;
  numberOfCopies: number;
  authorID: number;

  constructor() {
    //this.id = -1;
    this.title = 'Učitavanje...';
    this.numberOfCopies = -1;
    this.authorID = -1;
    this.description = '';
  }
}

export class BookUpdateVM {
  id: number;
  description: string;
  title: string;
  numberOfCopies: number;

  constructor() {
    this.id = -1;
    this.title = 'Učitavanje...';
    this.numberOfCopies = -1;
    this.description = '';
  }
}

export class BookSearchVM {
  id: number;
  title: string;
  author: string;
  coverImage: string;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.author = 'ucitavanje...';
    this.title = 'Ucitavanje...';
    this.coverImage = '';
  }
}

export class CanLendVM {
  canLend: boolean;
  isMember: boolean;
  message: string;

  /**
   *
   */
  constructor() {
    this.canLend = false;
    this.isMember = false;
    this.message = '';
  }
}

export class LentBookListVM {
  id: number;
  lentAt: Date;
  returnDeadline: Date;
  returnTime: Date;
  returned: boolean;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.lentAt = new Date();
    this.returnDeadline = new Date();
    this.returnTime = new Date();
    this.returned = false;
  }
}

export class LentBookDetailedListVM {
  id: number;
  lentAt: Date;
  returnDeadline: Date;
  returnTime: Date;
  returned: boolean;
  book: Book;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.lentAt = new Date();
    this.returnDeadline = new Date();
    this.returnTime = new Date();
    this.returned = false;
    this.book = new Book();
  }
}

export class UserLentBookVM {
  bookID: number;
  title: string;
  author: string;
  libraryName: string;
  coverImage: string;
  returnDeadline: Date;

  /**
   *
   */
  constructor() {
    this.bookID = -1;
    this.author = 'ucitavanje...';
    this.title = 'Ucitavanje...';
    this.libraryName = 'Ucitavanje...';
    this.coverImage = '';
    this.returnDeadline = new Date();
  }
}

export class LentBookAvailabilityVM {
  lentAt: Date;
  returnDeadline: Date;

  /**
   *
   */
  constructor() {
    this.lentAt = new Date();
    this.returnDeadline = new Date();
  }
}

export class RegisterLendingSummary {
  book: BookSearchVM;
  member: MemberListVM;
  numberOfCopies: number;
  copiesRemaining: number;

  /**
   *
   */
  constructor() {
    this.book = new BookSearchVM();
    this.member = new MemberListVM();
    this.numberOfCopies = -1;
    this.copiesRemaining = -1;
  }
}
