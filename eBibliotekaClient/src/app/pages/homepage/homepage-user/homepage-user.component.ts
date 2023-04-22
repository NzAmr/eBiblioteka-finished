import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-user',
  templateUrl: './homepage-user.component.html',
  styleUrls: [
    './homepage-user.component.css',
    '../landing-page/landing-page.component.css',
  ],
})
export class HomepageUserComponent implements OnInit {
  searchFilter: string = '';

  constructor() {}

  ngOnInit(): void {}
}
