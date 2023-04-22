import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../../../../core/http/book.service';
import { BookDetailsVM } from '../../../../data/interfaces/Book';

@Component({
  selector: 'app-check-availability-auth',
  templateUrl: './check-availability-auth.component.html',
  styleUrls: ['./check-availability-auth.component.css'],
})
export class CheckAvailabilityAuthComponent implements OnInit {
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
}
