import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LibraryService } from '../../../../core/http/library.service';
import { ValidationService } from '../../../../core/validation/validation.service';
import { FieldType } from '../../../../data/enums/FieldType';
import {
  BusinessHours,
  BusinessHoursEdit,
  convertFromBusinessHoursEdit,
} from '../../../../data/interfaces/BusinessHours';

@Component({
  selector: 'app-business-hours-edit',
  templateUrl: './business-hours-edit.component.html',
  styleUrls: [
    './business-hours-edit.component.css',
    '../membership-offer/membership-offer-auth/membership-offer-auth.component.css',
    '../../../../core/register/register.component.css',
    '../../../../core/register/register-user/register-user.component.css',
  ],
})
export class BusinessHoursEditComponent implements OnInit {
  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();
  @Output() onSuccess: EventEmitter<BusinessHours> =
    new EventEmitter<BusinessHours>();
  loading: boolean = false;

  @Input() hours: BusinessHoursEdit = new BusinessHoursEdit();

  errors: {
    title: string[];
    timeFrom: string[];
    timeTo: string[];
  } = {
    title: [],
    timeFrom: [],
    timeTo: [],
  };

  constructor(
    private libraryService: LibraryService,
    private validationService: ValidationService
  ) {
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
  }

  ngOnInit(): void {}

  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');

    this.onCloseOverlay.emit();
  }

  getScrollPos() {
    return window.scrollY;
  }

  submit() {
    if (this.validate()) {
      this.loading = true;

      this.libraryService
        .addBusinessHours(convertFromBusinessHoursEdit(this.hours))
        .subscribe(
          (res) => {
            this.onSuccess.emit(res);
            this.loading = false;
            this.closeOverlay();
          },
          (err) => {
            alert('greska');
            this.loading = false;
          }
        );
    } else {
      alert('Provjerite unos pa pokušajte ponovo!');
    }
  }

  titleChange() {
    this.errors.title = [];

    if (!this.hours.title) {
      this.errors.title.push('Polje je obavezno!');
    }
  }

  timeFromChange() {
    this.errors.timeFrom = [];

    if (this.hours.timeFrom[0] != null && this.hours.timeFrom[1] != null) {
      this.validationService
        .validateField(FieldType.Hour, this.hours.timeFrom[0].toString())
        .subscribe((res) => {
          res.forEach((element) => {
            this.errors.timeFrom.push(element);
          });
        });

      this.validationService
        .validateField(FieldType.Minutes, this.hours.timeFrom[1].toString())
        .subscribe((res) => {
          res.forEach((element) => {
            this.errors.timeFrom.push(element);
          });
        });
    } else {
      this.errors.timeFrom = ['Polje je obavezno!'];
    }
  }

  timeToChange() {
    this.errors.timeTo = [];

    if (this.hours.timeTo[0] != null && this.hours.timeTo[1] != null) {
      this.validationService
        .validateField(FieldType.Hour, this.hours.timeTo[0].toString())
        .subscribe((res) => {
          res.forEach((element) => {
            this.errors.timeTo.push(element);
          });
        });

      this.validationService
        .validateField(FieldType.Minutes, this.hours.timeTo[1].toString())
        .subscribe((res) => {
          res.forEach((element) => {
            this.errors.timeTo.push(element);
          });
        });
    } else {
      this.errors.timeTo = ['Polje je obavezno!'];
    }
  }

  validate() {
    if (this.hours.title) {
      if (
        this.errors.title.length === 0 &&
        this.errors.timeFrom.length === 0 &&
        this.errors.timeTo.length === 0
      ) {
        return true;
      }
    }

    return false;
  }
}
