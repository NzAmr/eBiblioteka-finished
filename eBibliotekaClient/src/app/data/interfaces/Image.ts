export class Image {
  id: number;
  path: string;
  createdAt: Date;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.path = '';
    this.createdAt = new Date();
  }
}
