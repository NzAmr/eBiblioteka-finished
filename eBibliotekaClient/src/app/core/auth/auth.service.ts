import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { HttpConfig } from 'src/app/configs/HttpConfig';
import { CreateUserVM, LoginVM, User } from 'src/app/data/interfaces/User';
import { AccountType } from '../../data/enums/AccountType';
import {
  GetLibrarianVM,
  RegisterLibrarianVM,
} from '../../data/interfaces/Librarian';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accountType = new Subject<AccountType | null>();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  /* USER */

  userRegister(credentials: CreateUserVM): Observable<User> {
    return this.http.post<User>(
      HttpConfig.EndPoints.user.register,
      credentials,
      HttpConfig.httpsOptions
    );
  }

  userLogin(credentials: LoginVM) {
    return this.http.post<User>(
      HttpConfig.EndPoints.user.login,
      credentials,
      HttpConfig.httpsOptions
    );
  }

  userCheckUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${HttpConfig.EndPoints.user.usernameCheck}/${username}`
    );
  }

  /* LIBRARIAN */

  librarianRegister(
    credentials: RegisterLibrarianVM
  ): Observable<GetLibrarianVM> {
    return this.http.post<GetLibrarianVM>(
      HttpConfig.EndPoints.librarian.register,
      credentials,
      HttpConfig.httpsOptions
    );
  }

  librarianLogin(credentials: LoginVM) {
    return this.http.post<GetLibrarianVM>(
      HttpConfig.EndPoints.librarian.login,
      credentials,
      HttpConfig.httpsOptions
    );
  }

  librarianCheckUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${HttpConfig.EndPoints.librarian.usernameCheck}/${username}`
    );
  }

  getLibraryId(): Observable<number> {
    return this.http.get<number>(HttpConfig.EndPoints.librarian.libraryId);
  }

  BookAuthCheck(bookId: number): Observable<boolean> {
    return this.http.get<boolean>(
      HttpConfig.EndPoints.librarian.bookAuthCheck + bookId
    );
  }
  SeriesAuthCheck(seriesId: number): Observable<boolean> {
    return this.http.get<boolean>(HttpConfig.EndPoints.librarian.seriesAuthCheck + seriesId);
  }

  /* SHARED */

  logout() {
    localStorage.removeItem('jwt');
  }

  getAccountType(): Observable<AccountType> {
    return this.http.get<AccountType>(HttpConfig.EndPoints.getAccountType);
  }

  setAccountType() {
    const token = localStorage.getItem('jwt');

    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.accountType.next(null);
        return false;
      }

      this.getAccountType().subscribe((type) => {
        this.accountType.next(type);
        return true;
      });
    }

    this.accountType.next(null);
    return false;
  }
}
