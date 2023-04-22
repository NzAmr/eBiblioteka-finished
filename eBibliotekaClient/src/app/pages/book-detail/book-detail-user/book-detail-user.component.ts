import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesListItem } from 'src/app/data/interfaces/Series';
import { Tag, TagGetVM } from 'src/app/data/interfaces/Tag';
import { BookService } from '../../../core/http/book.service';
import {
  Book,
  BookDetailsVM,
  CanLendVM,
  LentBookListVM,
} from '../../../data/interfaces/Book';
import { createImgPath } from '../../../helpers/CreateImgPath';
import { getFormattedDateTime } from '../../../helpers/getFormattedDate';

@Component({
  selector: 'app-book-detail-user',
  templateUrl: './book-detail-user.component.html',
  styleUrls: ['./book-detail-user.component.css'],
})
export class BookDetailUserComponent implements OnInit {
  bookId: number = -1;
  book: BookDetailsVM = new BookDetailsVM();
  series: SeriesListItem[] = [];
  canLend: CanLendVM = new CanLendVM();
  lentBooks: LentBookListVM[] = [];
  showLentBooksDropdown: boolean = false;

  showLendBookForm: boolean = false;
  tags: TagGetVM[];

  constructor(private bookService: BookService, private route: ActivatedRoute) {
    this.bookId = -1;
    this.tags = [];
  }

  ngOnInit(): void {
    this.bookId = parseInt(this.route.snapshot.params['id']);
    this.bookService.getBook(this.bookId).subscribe((res) => {
      this.book = res;

      this.bookService.canLendBook(this.bookId).subscribe(
        (res) => {
          this.canLend = res;

          if (this.canLend.isMember) {
            this.bookService.getLentBooksForUserByBook(this.bookId).subscribe(
              (res) => {
                this.lentBooks = res;
              },
              (res) => {
                alert(res);
              }
            );
          }
        },
        (res) => {
          alert(JSON.stringify(res));
        }
      );
    });
    this.loadTags();
    this.loadSeries();
  }

  setShowLendBookForm(option: boolean) {
    this.showLendBookForm = option;
  }
  loadSeries() {
    this.bookService.getSeriesByBook(this.bookId).subscribe(
      (res) => {
        this.series = res;
        console.log(this.series);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  formatDate(date: Date) {
    return getFormattedDateTime(date);
  }

  switchLentBooksDropdown() {
    this.showLentBooksDropdown = !this.showLentBooksDropdown;
    console.log(!this.showLentBooksDropdown);
  }

  showLentBookList() {
    return this.lentBooks.length !== 0;
  }
  loadTags() {
    this.bookService.getTagsByBookId(this.bookId).subscribe(
      (res) => {
        this.tags = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCoverImagePath() {
    if (this.book.coverImage) {
      return createImgPath(this.book.coverImage.path);
    } else {
      return '';
    }
  }
}
