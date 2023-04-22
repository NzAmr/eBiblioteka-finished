import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookSearchVM } from 'src/app/data/interfaces/Book';
import { createImgPath } from 'src/app/helpers/CreateImgPath';

@Component({
  selector: 'app-add-book-item',
  templateUrl: './add-book-item.component.html',
  styleUrls: ['./add-book-item.component.css']
})
export class AddBookItemComponent implements OnInit {

  @Input() book: BookSearchVM = new BookSearchVM();
  @Input() seriesID: number;
  @Input() loading: boolean = false;
  @Output() onActionComplete: EventEmitter<any> = new EventEmitter();
  @Output() addBookID:EventEmitter<number> = new EventEmitter();
  constructor() {
    this.seriesID = -1;
   }

  ngOnInit(): void {
  }
  getFullImagePath(path: string) {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }
  onComplete(){
    this.onActionComplete.emit();
  }
}
