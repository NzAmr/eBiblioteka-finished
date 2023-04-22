import { NodeWithI18n } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../../../../core/http/book.service';
import { Book, BookDetailsVM } from '../../../../data/interfaces/Book';

@Component({
  selector: 'app-lend-book-form',
  templateUrl: './lend-book-form.component.html',
  styleUrls: ['./lend-book-form.component.css'],
})
export class LendBookFormComponent implements OnInit {
  @Output() onClose: EventEmitter<null> = new EventEmitter<null>();
  @Input() book: BookDetailsVM = new BookDetailsVM();
  @Input() id: number = -1;

  loading: boolean = false;
  lendDate: string;
  returnDate: string = '';

  errors: string[] = [];

  constructor(private bookService: BookService) {
    let currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset()
    );
    this.lendDate = currentDate.toISOString().slice(0, -8);
  }

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
  }

  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');
    this.onClose.emit();
  }

  getScrollPos() {
    return window.scrollY;
  }

  submit() {
    if (this.validate()) {
      this.loading = true;

      this.bookService.lendBook(this.id, this.returnDate).subscribe(
        (res) => {
          this.loading = false;
          location.reload();
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
