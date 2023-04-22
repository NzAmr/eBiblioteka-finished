import { Component, Input, OnInit } from '@angular/core';
import { LibraryListVM } from 'src/app/data/interfaces/Library';
import { createImgPath } from '../../../helpers/CreateImgPath';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css'],
})
export class LibraryListComponent implements OnInit {
  @Input() libraries: LibraryListVM[] = [];
  @Input() loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getFullPath(path: string) {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }

  getFormattedAbout(library: LibraryListVM) {
    if (library.about && library.about.length > 150) {
      return library.about.slice(0, 430) + '...';
    }
    return library.about;
  }
}
