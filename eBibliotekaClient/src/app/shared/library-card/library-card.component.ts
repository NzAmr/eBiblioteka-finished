import { Component, Input, OnInit } from '@angular/core';
import { Library, UserLibraryVM } from '../../data/interfaces/Library';
import { createImgPath } from '../../helpers/CreateImgPath';

@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.css'],
})
export class LibraryCardComponent implements OnInit {
  @Input() library: UserLibraryVM = new UserLibraryVM();
  @Input() showAction: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getFullPath(path: string) {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }

  getFormattedAbout() {
    if (this.library.about && this.library.about.length > 207) {
      return this.library.about.slice(0, 207) + '...';
    }
    return this.library.about;
  }

  getFullImagePath(path: string | undefined) {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }
}
