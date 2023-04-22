import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/core/http/book.service';
import { Book } from 'src/app/data/interfaces/Book';
import { AuthService } from '../../core/auth/auth.service';
import { AccountType } from '../../data/enums/AccountType';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  bookId: number;
  auth: boolean = false;
  loading: boolean = true;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.bookId = -1;
  }

  ngOnInit(): void {
    console.log('onInit');
    this.bookId = parseInt(this.route.snapshot.params['id']);

    this.authService.BookAuthCheck(this.bookId).subscribe((res) => {
      console.log(res);
      if (res) {
        this.auth = true;
      }
      this.loading = false;
    });
  }
}
