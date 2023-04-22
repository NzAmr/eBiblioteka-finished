import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountType } from '../../data/enums/AccountType';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();
  accountType: AccountType;

  constructor() {
    this.accountType = AccountType.User;
  }

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
  }

  closeOverlay() {
    document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');
    this.onCloseOverlay.emit();
  }

  setAccountType(type: AccountType) {
    this.accountType = type;
  }

  public get getAccountType(): typeof AccountType {
    return AccountType;
  }
}
