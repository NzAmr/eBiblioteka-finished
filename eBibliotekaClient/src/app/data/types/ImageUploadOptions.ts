import { Image } from '../interfaces/Image';

export class ImageUploadOptions {
  url: string;
  title: string;
  subtitle: string;
  currentImage?: Image;

  /**
   *
   */
  constructor() {
    this.url = 'invalid';
    this.title = 'loading...';
    this.subtitle = 'loading...';
  }
}
