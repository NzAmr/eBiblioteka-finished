import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header-librarian',
  templateUrl: './header-librarian.component.html',
  styleUrls: ['./../header.component.css'],
})
export class HeaderLibrarianComponent implements OnInit {
  @Input() url: string;

  constructor(private authService: AuthService) {
    this.url = '';
  }

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
    window.location.reload();
  }
}