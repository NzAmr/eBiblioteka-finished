import { getLocaleMonthNames } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  previousMonday,
  startOfMonth,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  add,
  format,
} from 'date-fns';
import { areEqual } from '../../helpers/compareDates';
import { DatePickerMeta } from './DatePickerMeta';
import { Month, months } from './Month';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() returnDate: string = '';
  @Output() onDateClick: EventEmitter<string> = new EventEmitter<string>();

  days: string[] = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
  months: Month[] = months;

  monthPicker: Month = new Month();
  date = new Date();

  dateStart = new Date();
  dateEnd = new Date();

  dates: DatePickerMeta[] = [];

  ngOnChanges(): void {
    this.renderCycle();
  }

  renderCycle() {
    this.dates = [];
    this.monthPicker = months[this.date.getMonth()];

    var item = previousMonday(startOfMonth(this.date));
    let reachedFirstOfMonth = false;
    let reachedEndOfMonth = false;

    if (this.returnDate) {
      this.dateEnd = new Date(this.returnDate);
    }

    this.dateStart.setHours(0, 0, 0, 0);
    this.dateEnd.setHours(0, 0, 0, 0);

    for (let index = 0; index < 42; index++) {
      let metaItem = new DatePickerMeta();

      if (!reachedFirstOfMonth) {
        if (isFirstDayOfMonth(item)) {
          reachedFirstOfMonth = true;
        }
      }

      if (reachedFirstOfMonth && !reachedEndOfMonth) {
        metaItem.color = '303030';
      } else {
        metaItem.color = '8A8A8A';
      }

      if (reachedFirstOfMonth && !reachedEndOfMonth) {
        reachedEndOfMonth = isLastDayOfMonth(item);
      }

      if (this.returnDate) {
        if (item > this.dateStart && item < this.dateEnd) {
          metaItem.color = 'fff';
          metaItem.pipeColor = '00D8B1';
        }

        if (item.toDateString() == this.dateStart.toDateString()) {
          metaItem.color = 'fff';
          metaItem.pipeColor = '00D8B1';
          metaItem.dotColor = '00D8B1';
        } else if (item.toDateString() == this.dateEnd.toDateString()) {
          metaItem.color = 'fff';
          metaItem.dotColor = '00D8B1';
        }
      } else if (item.toDateString() == this.dateStart.toDateString()) {
        metaItem.color = 'fff';
        metaItem.dotColor = '00D8B1';
      }

      if (item.getDay() === 1 && !areEqual(item, this.dateStart)) {
        metaItem.startOfWeek = true;
      }

      metaItem.date = item;

      this.dates.push(metaItem);
      item = add(item, { days: 1 });
    }
  }

  ngOnInit(): void {}

  selectDate(date: Date) {
    this.onDateClick.emit(
      format(date, 'yyyy-MM-dd') + 'T' + format(date, 'hh:mm')
    );
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
