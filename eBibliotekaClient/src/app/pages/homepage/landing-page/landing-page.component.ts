import { Component, OnInit } from '@angular/core';
import { AccountType } from '../../../data/enums/AccountType';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  accountType: AccountType = AccountType.User;

  constructor() {}

  ngOnInit(): void {}

  getAccountType(): typeof AccountType {
    return AccountType;
  }

  setAccountType(option: AccountType) {
    this.accountType = option;
  }
}
