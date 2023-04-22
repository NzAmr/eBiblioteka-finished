import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/core/http/book.service';
import { BookSearchVM } from 'src/app/data/interfaces/Book';
import { PagedList } from '../../data/types/PagedList';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit {
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
    this.router.navigateByUrl(`/knjiga/${id}`);
  }
}
