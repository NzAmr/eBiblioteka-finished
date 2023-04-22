import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../core/http/book.service';
import { BookSearchVM } from '../../../data/interfaces/Book';
import { MemberListVM } from '../../../data/interfaces/Membership';
import { createImgPath } from '../../../helpers/CreateImgPath';
import { getFormattedDate } from '../../../helpers/getFormattedDate';

@Component({
  selector: 'app-register-lending-summary',
  templateUrl: './register-lending-summary.component.html',
  styleUrls: [
    './register-lending-summary.component.css',
    '../../member-search/member-list/member-list.component.css',
    '../../book-detail/book-detail-user/lend-book-form/lend-book-form.component.css',
  ],
})
export class RegisterLendingSummaryComponent implements OnInit {
  @Input() bookId: number = -1;
  @Input() memberId: number = -1;

  loading: boolean = false;

  book: BookSearchVM = new BookSearchVM();
  numberOfCopies: number = -1;
  copiesRemaining: number = -1;
  member: MemberListVM = new MemberListVM();

  submitLoading: boolean = false;
  lendDate: string;
  returnDate: string = '';

  errors: string[] = [];

  constructor(private bookService: BookService, private router: Router) {
    let currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    );
    this.lendDate = currentDate.toISOString().slice(0, -8);
  }

  ngOnInit(): void {
    this.loading = true;

    this.bookService
      .registerLendingSummary(this.memberId, this.bookId)
      .subscribe((res) => {
        this.book = res.book;
        this.member = res.member;
        this.numberOfCopies = res.numberOfCopies;
        this.copiesRemaining = res.copiesRemaining;
        this.loading = false;
      });
  }

  getFormattedDate(date: Date) {
    return getFormattedDate(date);
  }

  getFullImagePath(path: string): string {
    if (path) {
      return createImgPath(path);
    }
    return '';
  }

  submit() {
    if (this.validate()) {
      this.loading = true;

      this.bookService
        .registerLending(this.memberId, this.bookId, this.returnDate)
        .subscribe(
          (res) => {
            this.loading = false;
            alert('Uspješno evidentirano!');
            this.router.navigateByUrl('/');
          },
          (err) => {
            this.loading = false;
            alert(err.error.message);
          }
        );
    }
  }

  validate(): boolean {
    this.errors = [];

    let _lendDate1 = new Date(this.lendDate);
    let _returnDate1 = new Date(this.returnDate);

    if (!this.returnDate) {
      this.errors.push('Unesite datum do kojeg planirate vratiti knjigu!');
      return false;
    } else if (_lendDate1 > _returnDate1) {
      console.log(_lendDate1);
      console.log(_returnDate1);
      this.errors.push('Rok za vraćanje ne može biti prije iznajmljivanja!');
      return false;
    } else if (
      new Date(_lendDate1.setMonth(_lendDate1.getMonth() + 1)) < _returnDate1
    ) {
      this.errors.push(
        'Rok za vraćanje ne može više od mjesec dana poslije iznajmljivanja!'
      );
      return false;
    }

    return true;
  }

  onReturnDateChange() {
    if (!this.validate()) {
      this.returnDate = '';
    }
  }

  selectDate(date: string) {
    this.returnDate = date;

    if (!this.validate()) {
      this.returnDate = '';
    }
  }
}
