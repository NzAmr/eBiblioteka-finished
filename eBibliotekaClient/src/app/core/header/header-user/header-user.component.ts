import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./../header.component.css'],
})
export class HeaderUserComponent implements OnInit {
  @Input() url: string;
  showNotifications: boolean = false;
  constructor(private authService: AuthService) {
    this.url = '';
  }

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
    window.location.reload();
  }
  setShowNotifications(option:boolean){
    this.showNotifications = option;
  }
}