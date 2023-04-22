import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookSearchVM } from 'src/app/data/interfaces/Book';
import { createImgPath } from '../../../helpers/CreateImgPath';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  @Input() books: BookSearchVM[] = [];
  @Input() loading: boolean = false;
  @Input() libraryId: number = -1;
  @Input() actionText: string = 'DETALJNO';
  @Output() onActionClick: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  getFullImagePath(path: string) {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }

  selectBook(id: number) {
    this.onActionClick.emit(id);
  }
}
