import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../configs/HttpConfig';
import {
  Account,
  AccountUpdateVM,
  PasswordChangeVM,
} from '../../data/interfaces/Account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  userGetAccount(): Observable<Account> {
    return this.http.get<Account>(HttpConfig.EndPoints.user.account);
  }

  userUpdateAccount(data: AccountUpdateVM): Observable<Account> {
    return this.http.post<Account>(
      HttpConfig.EndPoints.user.account,
      data,
      HttpConfig.httpsOptions
    );
  }

  userUpdatePassword(data: PasswordChangeVM): Observable<Account> {
    return this.http.post<Account>(
      HttpConfig.EndPoints.user.updatePassword,
      data,
      HttpConfig.httpsOptions
    );
  }

  /* LIBRARIAN */

  librarianGetAccount(): Observable<Account> {
    return this.http.get<Account>(HttpConfig.EndPoints.librarian.account);
  }

  librarianUpdateAccount(data: AccountUpdateVM): Observable<Account> {
    return this.http.post<Account>(
      HttpConfig.EndPoints.librarian.account,
      data,
      HttpConfig.httpsOptions
    );
  }

  librarianUpdatePassword(data: PasswordChangeVM): Observable<Account> {
    return this.http.post<Account>(
      HttpConfig.EndPoints.librarian.updatePassword,
      data,
      HttpConfig.httpsOptions
    );
  }
}
