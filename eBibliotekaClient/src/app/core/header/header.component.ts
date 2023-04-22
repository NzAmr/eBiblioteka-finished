import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountType } from 'src/app/data/enums/AccountType';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  accountType: AccountType | null;

  url: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    public location: Location
  ) {
    this.url = '';

    this.accountType = null;

    authService.accountType.subscribe((accountType) => {
      this.accountType = accountType;
    });
    authService.setAccountType();
  }

  ngOnInit(): void {
    this.router.events.subscribe((events) => {
      this.url = this.location.path();
    });
  }

  public get getAccountType(): typeof AccountType {
    return AccountType;
  }
}