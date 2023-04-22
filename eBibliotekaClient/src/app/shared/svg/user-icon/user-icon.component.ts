import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.css'],
})
export class UserIconComponent implements OnInit {
  @Input() svgClass: string;
  constructor() {
    this.svgClass = '';
  }

  ngOnInit(): void {}
}
