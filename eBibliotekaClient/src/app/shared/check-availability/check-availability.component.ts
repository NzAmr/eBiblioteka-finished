import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  previousMonday,
  startOfMonth,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  add,
  format,
} from 'date-fns';
import { BookService } from '../../core/http/book.service';
import { LentBookAvailabilityVM } from '../../data/interfaces/Book';
import { CheckAvailabilityMeta } from './CheckAvailabilityMeta';
import { Month, months } from '../date-picker/Month';
import { isInInterval } from '../../helpers/isInInterval';

@Component({
  selector: 'app-check-availability',
  templateUrl: './check-availability.component.html',
  styleUrls: ['./check-availability.component.css'],
})
export class CheckAvailabilityComponent implements OnInit {
  @Input() bookId: number = -1;
  @Input() noOfCopies: number = -1;

  days: string[] = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
  months: Month[] = months;

  lentBooks: LentBookAvailabilityVM[] = [];

  monthPicker: Month = new Month();
  date = new Date();

  dates: CheckAvailabilityMeta[] = [];

  /**
   *
   */
  constructor(private bookService: BookService) {}

  ngOnChanges(): void {
    this.renderCycle();
  }

  renderCycle() {
    this.dates = [];
    this.monthPicker = months[this.date.getMonth()];

    var item = previousMonday(startOfMonth(this.date));
    let reachedFirstOfMonth = false;
    let reachedEndOfMonth = false;

    for (let index = 0; index < 42; index++) {
      let metaItem = new CheckAvailabilityMeta();

      if (!reachedFirstOfMonth) {
        if (isFirstDayOfMonth(item)) {
          reachedFirstOfMonth = true;
        }
      }

      if (reachedFirstOfMonth && !reachedEndOfMonth) {
        metaItem.color = '#303030';
      } else {
        metaItem.color = '#8A8A8A';
      }

      if (reachedFirstOfMonth && !reachedEndOfMonth) {
        reachedEndOfMonth = isLastDayOfMonth(item);
      }

      this.lentBooks.forEach((lentBook) => {
        if (
          isInInterval(
            item,
            new Date(lentBook.lentAt),
            new Date(lentBook.returnDeadline)
          )
        ) {
          metaItem.number++;
          console.log(item);
        }
      });

      if (metaItem.number) {
        if (metaItem.number / this.noOfCopies > 0.1) {
          metaItem.color = '#fff';
        }
        metaItem.pipeColor = `rgba(119, 8, 8, ${
          metaItem.number / this.noOfCopies
        })`;
      }

      if (item.getDay() === 1) {
        metaItem.startOfWeek = true;
      }

      metaItem.date = item;

      this.dates.push(metaItem);
      item = add(item, { days: 1 });
    }
  }

  ngOnInit(): void {
    this.bookService.getLentBooksForBook(this.bookId).subscribe((res) => {
      this.lentBooks = res;
      this.renderCycle();
      console.log(res);
    });
  }

  nextMonth() {
    this.date = add(this.date, { months: 1 });
    this.renderCycle();
  }

  prevMonth() {
    this.date = add(this.date, { months: -1 });
    this.renderCycle();
  }
}
