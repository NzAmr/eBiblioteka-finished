import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header-unauthorized',
  templateUrl: './header-unauthorized.component.html',
  styleUrls: ['./../header.component.css'],
})
export class HeaderUnauthorizedComponent implements OnInit, OnChanges {
  @Input() url: string;

  showRegister = false;
  showLogin = false;

  homepageAfterLogin = false;

  constructor(private authService: AuthService) {
    this.url = '';
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.url == '/login') {
      this.showLogin = true;
      this.homepageAfterLogin = true;
    }
    if (this.url == '/register') {
      this.showRegister = true;
    }
  }

  setShowRegister(option: boolean) {
    this.showRegister = option;
  }

  setShowLogin(option: boolean) {
    this.showLogin = option;
  }
}
