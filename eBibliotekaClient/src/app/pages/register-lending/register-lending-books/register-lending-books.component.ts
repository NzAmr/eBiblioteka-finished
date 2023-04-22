import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../core/http/book.service';
import { BookSearchVM } from '../../../data/interfaces/Book';
import { PagedList } from '../../../data/types/PagedList';

@Component({
  selector: 'app-register-lending-books',
  templateUrl: './register-lending-books.component.html',
  styleUrls: [
    './register-lending-books.component.css',
    '../../book-search/book-search.component.css',
  ],
})
export class RegisterLendingBooksComponent implements OnInit {
  @Output() onSelectBook: EventEmitter<number> = new EventEmitter<number>();

  libraryId: number;
  filter: string;
  pagedList: PagedList<BookSearchVM> = new PagedList<BookSearchVM>();
  loading: boolean = false;
  page: number = 1;
  url: string = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filter = '';
    this.libraryId = -1;
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] != null) {
      this.libraryId = parseInt(this.route.snapshot.params['id']);
    }
    this.loadPage(1);
  }
  search() {
    this.loadPage(1);
  }
  loadPage(page: number) {
    this.loading = true;
    if (this.libraryId === -1) {
      this.bookService.searchBooks(this.filter, page).subscribe((res) => {
        this.pagedList = res;
        this.loading = false;
      });
    } else {
      this.bookService
        .searchBooksUser(this.filter, this.page, this.libraryId)
        .subscribe((res) => {
          this.pagedList = res;
          this.loading = false;
        });
    }
  }

  selectBook(id: number) {
    this.onSelectBook.emit(id);
  }
}
