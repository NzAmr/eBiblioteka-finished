import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountType } from '../../data/enums/AccountType';
import { LoginVM } from '../../data/interfaces/User';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../register/register.component.css',
    '../register/register-user/register-user.component.css',
  ],
})
export class LoginComponent implements OnInit {
  @Output() onCloseOverlay: EventEmitter<null> = new EventEmitter();
  @Input() homepageAfterLogin: boolean = false;

  credentials: LoginVM;
  loading: boolean;
  accountType: AccountType;
  invalidCredentials: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.accountType = AccountType.User;
    this.loading = false;

    this.credentials = { username: '', password: '' };
    this.invalidCredentials = false;
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

  onSubmit() {
    this.loading = true;

    if (this.accountType === AccountType.User) {
      this.authService.userLogin(this.credentials).subscribe(
        (res) => {
          this.loading = false;
          const token = (<any>res).token;
          localStorage.setItem('jwt', token);
          if (this.homepageAfterLogin) {
            this.router.navigate(['/']);
          } else {
            window.location.reload();
          }
        },
        (err) => {
          this.loading = false;
          this.invalidCredentials = true;
        }
      );
    } else {
      this.authService.librarianLogin(this.credentials).subscribe(
        (res) => {
          this.loading = false;
          const token = (<any>res).token;
          localStorage.setItem('jwt', token);
          document
            .getElementsByTagName('body')[0]
            .classList.remove('stop-scrolling');
          this.router.navigate(['/']);
        },
        (err) => {
          this.loading = false;
          this.invalidCredentials = true;
        }
      );
    }
  }
}
