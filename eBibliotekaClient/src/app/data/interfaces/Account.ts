import { Image } from './Image';

export class Account {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: Image;
  updatedAt: Date;
  createdAt: Date;

  /**
   *
   */
  constructor() {
    this.email = 'Učitavanje';
    this.username = 'Učitavanje';
    this.firstName = 'Učitavanje';
    this.lastName = 'Učitavanje';
    this.updatedAt = new Date();
    this.createdAt = new Date();
  }
}

export interface AccountUpdateVM {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface PasswordChangeVM {
  currentPassword: string;
  newPassword: string;
}
