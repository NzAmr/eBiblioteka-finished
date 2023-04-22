import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AccountType } from 'src/app/data/enums/AccountType';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  accountType: AccountType | null;

  constructor(private authService: AuthService) {
    this.accountType = null;

    authService.accountType.subscribe(
      (accountType) => (this.accountType = accountType)
    );
    authService.setAccountType();
  }

  public get getAccountType(): typeof AccountType {
    return AccountType;
  }

  ngOnInit(): void {}
}
