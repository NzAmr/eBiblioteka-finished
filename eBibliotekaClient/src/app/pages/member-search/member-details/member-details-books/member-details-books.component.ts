import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book, LentBookDetailedListVM } from '../../../../data/interfaces/Book';
import { createImgPath } from '../../../../helpers/CreateImgPath';

@Component({
  selector: 'app-member-details-books',
  templateUrl: './member-details-books.component.html',
  styleUrls: ['./member-details-books.component.css'],
})
export class MemberDetailsBooksComponent implements OnInit {
  @Input() books: LentBookDetailedListVM[] = [];
  @Output() onAction: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  getCoverImagePath(book: Book) {
    if (book.coverImage) {
      return createImgPath(book.coverImage.path);
    } else {
      return '';
    }
  }

  registerLending(id: number) {
    if (confirm('Jeste li sigurni?')) {
      this.onAction.emit(id);
    }
  }
}
